'use strict'
const log = require('logger');
const mongo = require('mongoclient');
const getPlayer = require('./getPlayer');
const playerCache = require('../playerCache')
const { webHookMsg } = require('./discordMsg')

module.exports = async(opt = {})=>{
  try{
    let payload = {}
    if(opt.id > 999999){
      payload.allyCode = +opt.id
    }else{
      payload.playerId = opt.id
    }
    let data = await playerCache.get('gaCache', `${opt.id}-${opt.opponent}`, null, opt.projection)
    if(!data){
      if(opt.token) webHookMsg(opt.token, { content: 'Pulling new data...'}, 'PATCH')
      data = await getPlayer(payload, { collection: 'playerCache' })
      if(data){
        data.opponent = +opt.opponent
        playerCache.set('gaCache', `${opt.id}-${opt.opponent}`, data)
      }
    }
    return data
  }catch(e){
    log.error(e)
  }
}
