const redis = require('./.dist/libraries/redis')

async function run() {
  await redis.init()
  let { error, value } = await redis.set('efi', 'yossi')
  if (error) {
    console.log('oh my gosh', error)
    return
  }
  {
    let res = await redis.get('efi')
    let { error, value } = res
    console.log(res)
  }
}

run()
