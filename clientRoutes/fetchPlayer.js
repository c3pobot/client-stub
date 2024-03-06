'use strict'
const log = require('logger')
const getPlayer = require('./getPlayer')
const playerCache = require('../playerCache')
const { webHookMsg } = require('./discordMsg')

module.exports = async(opt = {})=>{
  try{
    let collection = opt.collection || 'playerCache'
    let data = await playerCache.get(collection, opt.playerId, +opt.allyCode, opt.projection)
    if(!data){
      let payload = { playerId: opt.playerId, allyCode: opt.allyCode }
      if(opt.playerId) delete playload.playerId
      if(opt.token) webHookMsg(opt.token, { content: 'Pulling new data...'}, 'PATCH')
      data = await getPlayer(payload, { collection: collection }, true)
    }
    return data
  }catch(e){
    log.error(e)
  }
}
