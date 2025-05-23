// Read event loop phases   

/**
 * Phases of callbacks
 * timers -> pending callback -> idle, prepare -> poll -> check -> close callback
 */
const fs = require('fs');
const crypto = require('crypto');

console.log("1. Script start");

setTimeout(()=>{
    console.log("2. Script macrotask callback 0s")
}, 0);

setTimeout(()=>{
    console.log("3. Macrotask set cabllback for 0s");
},0);

setImmediate(()=>{ console.log("4. set immediate callback")});

Promise.resolve().then(()=>{
    console.log("5. Promise resolved (microtask")
});

process.nextTick(()=>{
    console.log("6. process.nexttick Callback microtask")
})

fs.readFile(__filename,()=>{
    console.log("7. Input output callback")
})

crypto.pbkdf2('secret','hash', 10000, 64, 'sha512', (err,key)=>{
    if(err) throw err;

    console.log("8. crypto module is complete. CPU INTENSIVE TASK")
}
)