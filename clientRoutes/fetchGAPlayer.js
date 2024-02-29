'use strict'
const log = require('logger');
const mongo = require('mongoclient');
const getPlayer = require('./getPlayer');

module.exports = async(opt = {})=>{
  try{
    let payload = { opponent: +opt.opponent }, opts = {...{collection: 'playerCache'},...opt}
    if(opts.id > 999999){
      payload.allyCode = +opts.id
    }else{
      payload.playerId = opts.id
    }
    let obj = (await mongo.find('gaCache', payload))[0]
    if(!obj){
      if(opt.token) MSG.WebHookMsg(opt.token, {content: 'Pulling new data...'}, 'PATCH')
      delete payload.opponent
      opts.returnPlayers = true
      obj = await getPlayer(payload, opts)
      if(obj){
        obj.opponent = +opts.opponent
        mongo.set('guildIdCache', { _id: obj.playerId }, { playerId: obj.playerId, allyCode: +obj.allyCode, guildId: obj.guildId })
        await mongo.rep('gaCache', {_id: opts.opponent+'-'+obj.playerId}, obj)
      }
    }
    return obj
  }catch(e){
    log.error(e)
  }
}
