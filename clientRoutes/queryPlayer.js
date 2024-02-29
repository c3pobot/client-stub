'use strict'
const mongo = require('mongoclient')
const processAPIRequest = require('../processAPIRequest');
module.exports = async(obj = {})=>{
  try{
    const payload = { allyCode: obj.allyCode?.toString(), playerId: obj.playerId }
    if(payload.playerId) delete payload.allyCode
    if(payload.allyCode || payload.playerId) return await processAPIRequest('player', payload)
  }catch(e){
    throw(e)
  }
}
