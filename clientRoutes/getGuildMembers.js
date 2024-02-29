'use strict'
const getPlayer = require('./getPlayer')
const getCachePlayers = async(members = [], project)=>{
  try{
    let array = [], res = [], i = members.length
    if(project) project.playerId = 1
    const getCachePlayer = async(playerId)=>{
      try{
        let data = (await mongo.find('playerCache', { _id: playerId }, project))[0]
        if(data?.allyCode) res.push(data)
      }catch(e){
        throw(e)
      }
    }
    while(i--) array.push(getCachePlayer(members[i].playerId))
    await Promise.all(array)
    return res
  }catch(e){
    throw(e);
  }
}
const getNewPlayers = async(missingMembers = [])=>{
  try{
    let array = [], i = missingMembers.length
    while(i--) array.push(getPlayer({playerId: missingMembers[i].playerId, allyCode: missingMembers[i].allyCode?.toString()}, { collection: 'playerCache' }))
    return await Promise.all(array)
  }catch(e){
    throw(e);
  }
}
module.exports = async(member = [], projection)=>{
  try{
    let foundMemberIds = []
    let res = await getCachePlayers(member, projection)
    if(res?.length === member.length) return res
    if(res?.length > 0 ) foundMemberIds = res.map(x=>x.playerId)
    let missingMembers = member.filter(x=>!foundMemberIds.includes(x.playerId))
    let missing = await getNewPlayers(missingMembers)
    if(missing?.length > 0) res = res.concat(missing)
    if(res?.length === member?.length) return res
  }catch(e){
    throw(e);
  }
}
