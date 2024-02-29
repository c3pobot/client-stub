'use strict'
const mongo = require('mongoclient');
const queryPlayer = require('./queryPlayer');
const formatPlayer = require('./format/formatPlayer');
const statCalc = require('../statCalc');

module.exports = async(payload = {}, opt = {})=>{
  try{
    let collection = opt.collection || 'playerCache'
    let obj = await queryPlayer(payload)
    if(!obj?.rosterUnit || obj.rosterUnit.length === 0) return
    let stats = await statCalc.CalcRosterStats(obj.rosterUnit, obj.allyCode, true)
    if(!stats?.omiCount) return
    obj = {...obj,...stats}
    await formatPlayer(obj)
    if(!obj?.gp) return
    mongo.set(collection, {_id: obj.playerId}, obj)
    if(obj?.guildId)
    return obj
  }catch(e){
    console.error(e?.message)
    console.error('Get Player Error')
  }
}
