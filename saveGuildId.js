'use strict'
const log = require('logger')
const mongo = require('mongoclient')
module.exports = async(playerId, allyCode, guildId)=>{
  try{
    mongo.set('guildIdCache', { _id: playerId }, { playerId: playerId, allyCode: allyCode, guildId: guildId })
  }catch(e){
    log.error(e);
  }
}
