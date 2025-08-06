// lz4.js - An implementation of LZ4 in plain JavaScript.
// Based on code from https://github.com/Benzinga/lz4js
// Also a SQLite extension for compressing and uncompressing blobs with varint length prefix.

const utf8enc = new TextEncoder()

function lz4_compressBound(n) {
	return (n + n / 255 + 16) | 0
}

function lz4_uncompress(input, output, sIdx, eIdx) {
	var i = sIdx || 0
	var n = eIdx || (input.length - sIdx)
	var j = 0
	var l, end
	while (i < n) {
		var token = input[i++]

		// Literals
		var literals_length = (token >> 4)
		if (literals_length > 0) {
			// length of literals
			l = literals_length + 240
			while (l === 255) {
				l = input[i++]
				literals_length += l
			}

			// Copy the literals
			end = i + literals_length
			while (i < end)
				output[j++] = input[i++]

			// End of buffer?
			if (i === n)
				return j
		}

		// Match copy
		// 2 bytes offset (little endian)
		var offset = input[i++] | (input[i++] << 8)

		// 0 is an invalid offset value
		if (offset === 0 || offset > j)
			return -(i-2)

		// length of match copy
		var match_length = (token & 0xf)
		l = match_length + 240
		while (l === 255) {
			l = input[i++]
			match_length += l
		}

		// Copy the match
		var pos = j - offset // position of the match copy in the current output
		end = j + match_length + 4 // minmatch = 4
		while (j < end)
			output[j++] = output[pos++]
	}

	return j
}

// Compression format parameters/constants.
const minMatch = 4
const minLength = 13
const searchLimit = 5
const skipTrigger = 6
const hashSize = 1 << 12

// Token constants.
const mlBits = 4
const mlMask = (1 << mlBits) - 1
const runBits = 4
const runMask = (1 << runBits) - 1

// Shared buffers
const hashTable = new Uint32Array(hashSize)

function readU32(b, n) {
	return (b[n] << 0) | (b[n + 1] << 8) | (b[n + 2] << 16) | (b[n + 3] << 24)
}

function lz4_compress(src, dst, sIndex, sLength, dIndex) {
	let mIndex, mAnchor, mLength, mOffset, mStep
	let literalCount, sEnd, n

	hashTable.fill(0)

	// Setup initial state.
	sEnd = sLength + sIndex
	mAnchor = sIndex

	// Process only if block is large enough.
	if (sLength >= minLength) {
		let searchMatchCount = (1 << skipTrigger) + 3

		// Consume until last n literals (Lz4 spec limitation.)
		while (sIndex + minMatch < sEnd - searchLimit) {
			let seq = readU32(src, sIndex)
			let hash = Math.imul(seq, 2654435761) >>> 20

			// Look for a match in the hashtable. NOTE: remove one; see below.
			mIndex = hashTable[hash] - 1

			// Put pos in hash table. NOTE: add one so that zero = invalid.
			hashTable[hash] = sIndex + 1

			// Determine if there is a match (within range.)
			if (mIndex < 0 || (sIndex - mIndex) >>> 16 > 0 || readU32(src, mIndex) !== seq) {
				mStep = searchMatchCount++ >> skipTrigger
				sIndex += mStep
				continue
			}

			searchMatchCount = (1 << skipTrigger) + 3

			// Calculate literal count and offset.
			literalCount = sIndex - mAnchor
			mOffset = sIndex - mIndex

			// We've already matched one word, so get that out of the way.
			sIndex += minMatch
			mIndex += minMatch

			// Determine match length.
			// N.B.: mLength does not include minMatch, Lz4 adds it back
			// in decoding.
			mLength = sIndex
			while (sIndex < sEnd - searchLimit && src[sIndex] === src[mIndex]) {
				sIndex++
				mIndex++
			}
			mLength = sIndex - mLength

			// Write token + literal count.
			let token = mLength < mlMask ? mLength : mlMask
			if (literalCount >= runMask) {
				dst[dIndex++] = (runMask << mlBits) + token
				for (n = literalCount - runMask; n >= 0xff; n -= 0xff) {
					dst[dIndex++] = 0xff
				}
				dst[dIndex++] = n
			} else {
				dst[dIndex++] = (literalCount << mlBits) + token
			}

			// Write literals.
			for (let i = 0; i < literalCount; ++i) {
				dst[dIndex++] = src[mAnchor + i]
			}

			// Write offset.
			dst[dIndex++] = mOffset
			dst[dIndex++] = mOffset >> 8

			// Write match length.
			if (mLength >= mlMask) {
				for (n = mLength - mlMask; n >= 0xff; n -= 0xff) {
					dst[dIndex++] = 0xff
				}
				dst[dIndex++] = n
			}

			// Move the anchor.
			mAnchor = sIndex
		}
	}

	// Nothing was encoded.
	// if (mAnchor === 0) return 0

	// Write remaining literals.
	// Write literal token+count.
	literalCount = sEnd - mAnchor
	if (literalCount >= runMask) {
		dst[dIndex++] = runMask << mlBits
		for (n = literalCount - runMask; n >= 0xff; n -= 0xff) {
			dst[dIndex++] = 0xff
		}
		dst[dIndex++] = n
	} else {
		dst[dIndex++] = literalCount << mlBits
	}

	// Write literals.
	sIndex = mAnchor
	while (sIndex < sEnd) {
		dst[dIndex++] = src[sIndex++]
	}

	return dIndex
}

function lz4_uncompressBlob(p) {
	let n, outlen

	// read uncompressed length as a varint
	if (!(p[0]&0x80))
		n=1, outlen=p[0]
	else if (!(p[1]&0x80))
		n=2, outlen=((p[0]&0x7f)<<7)|p[1]
	else if (!(p[2]&0x80))
		n=3, outlen=((p[0]&0x7f)<<14)|((p[1]&0x7f)<<7)|p[2]
	else if (!(p[3]&0x80))
		n=4, outlen=((p[0]&0x7f)<<21)|((p[1]&0x7f)<<14)|((p[2]&0x7f)<<7)|p[3]
	else
		n=5, outlen=((p[0]&0x7f)<<28)|((p[1]&0x7f)<<21)|((p[2]&0x7f)<<14)|((p[3]&0x7f)<<7)|p[4]

	let output = new Uint8Array(outlen)
	lz4_uncompress(p, output, n, p.length - n)
	return output
}

function lz4_compressBlob(input) {
	if (typeof input === "string")
		input = utf8enc.encode(input)

	let v = input.length
	let n

	if (v <= 0x7f)
		n = 1
	else if (v <= 0x3fff)
		n = 2
	else if (v <= 0x1fffff)
		n = 3
	else if (v <= 0xfffffff)
		n = 4
	else
		n = 5

	let output = new Uint8Array(n + lz4_compressBound(v))

	// write uncompressed length as a varint
	if (v <= 0x7f) {
		output[0] = v&0x7f
	} else if (v <= 0x3fff) {
		output[0] = ((v>>7)&0x7f)|0x80
		output[1] = v&0x7f
	} else if (v <= 0x1fffff) {
		output[0] = ((v>>14)&0x7f)|0x80
		output[1] = ((v>>7)&0x7f)|0x80
		output[2] = v&0x7f
	} else if (v <= 0xfffffff) {
		output[0] = ((v>>21)&0x7f)|0x80
		output[1] = ((v>>14)&0x7f)|0x80
		output[2] = ((v>>7)&0x7f)|0x80
		output[3] = v&0x7f
	} else {
		output[0] = ((v>>28)&0x7f)|0x80
		output[1] = ((v>>21)&0x7f)|0x80
		output[2] = ((v>>14)&0x7f)|0x80
		output[3] = ((v>>7)&0x7f)|0x80
		output[4] = v&0x7f
	}

	let outlen = lz4_compress(input, output, 0, input.length, n)
	return output.subarray(0, outlen)
}

module.exports = {
	compressBound: lz4_compressBound,
	compress: lz4_compress,
	uncompress: lz4_uncompress,
	compressBlob: lz4_compressBlob,
	uncompressBlob: lz4_uncompressBlob,
}
