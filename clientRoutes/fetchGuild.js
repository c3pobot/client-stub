'use strict'
const log = require('logger');
const mongo = require('mongoclient');
const formatGuild = require('./format/formatGuild');
const getGuildId = require('./getGuildId');
const getGuildMembers = require('./getGuildMembers');
const queryGuild = require('../requests/queryGuild');
const guildCache = require('../guildCache')

module.exports = async(opt = {})=>{
  try{
    let members, needsFormat = false
    let guildId = await getGuildId(opt)
    if(!guildId) return
    let guild = await guildCache.get('guildCache', { _id: guildId })
    if(!guild){
      needsFormat = true
      let tempGuild = await queryGuild(guildId, true)
      if(tempGuild?.guild?.member?.length > 0) guild = tempGuild?.guild
      if(guild?.member?.length > 0) guild.member = guild.member.filter(x=>x.memberLevel > 1)
    }
    if(guild?.member?.length > 0) members = await getGuildMembers(guild.member, opt.projection)
    if(guild?.member?.length !== members?.length) return
    if(needsFormat){
      await formatGuild(guild, members)
      await guildCache.set('guildCache', { _id: guildId }, guild)
    }
    guild.member = members
    return guild
  }catch(e){
    log.error(e)
  }
}
