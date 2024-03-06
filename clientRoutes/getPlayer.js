'use strict'
const log = require('logger')
const mongo = require('mongoclient');
const queryPlayer = require('./queryPlayer');
const formatPlayer = require('./format/formatPlayer');
const statCalc = require('../statCalc');
const playerCache = require('../playerCahce');
const guildIdCache = require('guildIdCache')

module.exports = async(payload = {}, opt = {}, cachGuildId = true)=>{
  try{
    let collection = opt.collection || 'playerCache'
    let data = await queryPlayer(payload)
    if(!data?.rosterUnit || data.rosterUnit.length === 0) return
    let stats = await statCalc.CalcRosterStats(data, true)
    if(!stats?.omiCount) return
    data = {...data,...stats}
    await formatPlayer(data)
    if(!data?.gp) return
    playerCache.set(collection, data.playerId, data)
    if(cachGuildId) guildIdCache.set(data?.playerId, +data?.allyCode, data?.guildId)
    return obj
  }catch(e){
    log.error(e)
  }
}
