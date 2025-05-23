/**
 * Buffers are object which works with binary data
 * file system, cryptography, image processing
 */

const bufferOne = Buffer.alloc(10);  // Allocating the buffer of size 10 bit;
console.log(bufferOne, "buffer one")

const bufferFromString = Buffer.from('Aman');
console.log(bufferFromString," buffer from string")

const bufferFromAraryOfInt = Buffer.from([1,2,3,4,5]);
console.log(bufferFromAraryOfInt," buffer from array of int")

// How to write something to buffer

bufferOne.write('Node js development');
console.log("After write", bufferOne.toString());
console.log(bufferFromString.slice(0,3));

console.log(bufferFromString[0]);

const concatBuffer = Buffer.concat([bufferOne, bufferFromString]);
console.log(concatBuffer,"buffer")

// convert to json
console.log(concatBuffer.toJSON())