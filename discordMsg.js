'use strict'
const fetch = require('./fetch')
const discordUrl = process.env.DISCORD_PROXY_URI || 'https://discord.com'
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const apiRequest = async(uri, method, body, headers)=>{
  try{
    let opts = { headers: headers, method: method, timeout: 30000, compress: true }
    if(body) opts.body = body
    let res = await fetch(`${discordUrl}/api/${uri}`, opts)
    if(res?.status >= 200 && res?.status < 300) return res.body
  }catch(e){
    throw(e)
  }
}
module.exports.webHookMsg = async(token, msg2send = {}, method = 'POST')=>{
  try{
    if(!token || !DISCORD_CLIENT_ID) return
    if(typeof msg2send != 'object' && typeof msg2send == 'string') msg2send = { content: msg2send }
    if(!msg2send.content) msg2send.content = null
    if(!msg2send.components) msg2send.components = []
    let uri = `webhooks/${DISCORD_CLIENT_ID}/${token}`
    if(method === 'PATCH') uri += '/messages/@original'
    let res = await apiRequest(uri, method, JSON.stringify(msg2send), { "Content-Type": "application/json" })
    if(res?.status >= 300) throw(`${e.status} : ${e.body}`)
  }catch(e){
    log.error(e)
  }
}
