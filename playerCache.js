'use strict'
const mongo = require('mongoclient')

module.exports.set = async(collection, playerId, data)=>{
  try{
    if(!collection || !playerId || !data) return
    guildIdCache.set(playerId, +data?.allyCode, data?.guildId)
    return await mongo.set(collection, { _id: playerId }, data)
  }catch(e){
    throw(e)
  }
}
module.exports.get = async(collection, playerId, allyCode, projection)=>{
  try{
    let query = { _id: playerId, allyCode: allyCode }
    if(query._id) delete query.allyCode
    let res = (await mongo.find(collection, query, projection))[0]
    if(res?.allyCode) return res
  }catch(e){
    throw(e)
  }
}
