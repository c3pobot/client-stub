'use strict'
const mongo = require('mongoclient')
module.exports.set = async(playerId, allyCode, guildId)=>{
  try{
    return await mongo.set('guildIdCache', { _id: playerId }, { playerId: playerId, allyCode: +allyCode, guildId: guildId })
  }catch(e){
    throw(e)
  }
}
module.exports.get = async(playerId, allyCode)=>{
  try{
    let query = { _id: playerId, allyCode: allyCode }
    if(query._id) delete query.allyCode
    let res = (await mongo.find('guildIdCache', query))[0]
    if(res?.guildId) return res.guildId
  }catch(e){
    throw(e)
  }
}
