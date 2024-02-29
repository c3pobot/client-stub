'use strict'
const log = require('logger')
const mongo = require('mongoclient')
const formatGuild = require('./format/formatGuild');
const getGuildId = require('./getGuildId');
const getGuildMembers = require('./getGuildMembers');
const queryGuild = require('../requests/queryGuild');

module.exports = async(opt = {})=>{
  try{
    let members, guild, needsFormat = false
    let guildId = await GetGuildId(opt)
    if(guildId){
      guild = (await mongo.find('guildCache', {_id: guildId}))[0]
      if(!guild){
        needsFormat = true
        let tempGuild = await queryGuild(guildId, true)
        if(tempGuild?.guild?.member?.length > 0) guild = tempGuild?.guild
        if(guild?.member?.length > 0) guild.member = guild.member.filter(x=>x.memberLevel > 1)
      }
      if(guild?.member?.length > 0) members = await getGuildMembers(guild.member, opt.projection)
      if(guild?.member?.length == members?.length){
        if(needsFormat){
          await FormatGuild(guild, members)
          await mongo.rep('guildCache', {_id: guildId}, guild)
        }
        guild.member = members
        return guild
      }
    }
  }catch(e){
    log.error(e)
  }
}
