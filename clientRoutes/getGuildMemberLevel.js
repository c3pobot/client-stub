'use strict'
const log = require('logger')
const guildCache = require('../guildCache')
const getGuildId = require('./getGuildId')
const getAllyCode = require('./getAllyCode')
const getPlayerId = require('./getPlayerId')
const queryGuild = require('./queryGuild')

module.exports = async({ allyCode, playerId })=>{
  try{
    if(!playerId && allyCode) playerId = await getPlayerId({ allyCode: allyCode })
    if(!allyCode && playerId) allyCode = await getAllyCode({ playerId: playerId })
    if(!playerId || !allyCode) return { level: 0 }
    let guildId = await getGuildId({ opt.id: +allyCode })
    if(!guildId) return { level: 0 }
    let guild = await guildCache.get('guildCache', guildId, { member: { playerId: 1, memberLevel: 1} })
    if(!guild?.member){
      guild = await queryGuild(guildId, false)
      if(guild?.guild?.member) guild = guild.guild
    }
    if(guild?.member){
      let member = guild.member.find(x=>x.playerId === playerId)
      if(member) return { level: member.memberLevel }
    }
  }catch(e){
    log.error(e)
  }
}
