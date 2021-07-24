
const redis = require('redis')

const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
})

client.on('connect', () => {
  console.log('Client connected to redis...')
})


client.on('error', (err) => {
  console.log(err.message)
})



module.exports = client
















