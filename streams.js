// Allows to read data from a source in chunks
/**
 * 1. Readable streams -> used to read
 * 2. Writable streams -> used to write
 * 3. duplex -> can be used for both read and write
 * 4. transform -> zlib steam
 * 
 * Memory and time efficiency
 */

const fs = require('fs');
const zlib =  require('zlib') // used for compression
const crypto = require('crypto');
const { Transform } = require('stream');

class EncryptStream extends Transform{
    constructor(key, vector){
        super();
        this.key =key;
        this.vector = vector;
    }

    _transform(chunk, encoding, callback){
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
        const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]); // encrypt the data
        this.push(encrypted);
        callback();
    }
}

const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);

const readableStream = fs. createReadStream('readable.txt');

// new gzip object to compress the file

const gzipStream = zlib.createGzip();

const encryptStream = new EncryptStream(key, vector);

const writableStram = fs.createWriteStream('output.txt.fz.enc')

// Steps ->  read -> compress -> encrpyt -> writes

readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStram);

console.log("Task Complete")