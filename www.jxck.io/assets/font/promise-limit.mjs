"use strict"

// 並行数を指定して Promise all を実行
export default async function PromiseLimit(num, tasks) {
  function PromiseTask(tasks) {
    // task loop
    return new Promise(async (done, fail) => {
      const results = {
        fulfilled: [],
        rejected:  [],
      }
      while(tasks.length) {
        const task = tasks.shift()
        try {
          const result = await new Promise(task)
          results.fulfilled.push(result)
        } catch(err) {
          results.rejected.push(err)
        }
      }
      done(results)
    })
  }

  return new Promise(async (done, fail) => {
    // fork worker upto num
    const promises = [...Array(num)].map((n, i) => PromiseTask(tasks))
    const results  = (await Promise.all(promises)).reduce((acc, cur) => {
      return {
        fulfilled: [...acc.fulfilled, ...cur.fulfilled],
        rejected:  [...acc.rejected,  ...cur.rejected],
      }
    }, {fulfilled:[], rejected:[]})
    done(results)
  })
}

