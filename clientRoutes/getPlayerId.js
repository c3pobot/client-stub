'use strict'
const log = require('logger')
const playerCache = require('../playerCache')
const queryArenaPlayer = require('./queryArenaPlayer')

module.exports = async( opt = {} )=>{
  try{
    let data = await playerCache.get('playerCache', null, +opt.allyCode, { playerId: 1, allyCode: 1 })
    if(!data) data = await queryArenaPlayer({ allyCode: opt.allyCode?.toString() }, true)
    if(data?.playerId) return +data?.playerId
  }catch(e){
    log.error(e)
  }
}
