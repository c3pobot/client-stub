'use strict'
const getPlayer = require('./getPlayer');
const playerCache = require('../playerCache');

const getMember = async(playerId, projection)=>{
  try{
    let data = await playerCache.get('twPlayerCache', playerId, null, projection)
    if(!data){
      data = await playerCache.get('playerCache', playerId, null, projection)
      if(data?.allyCode) playerCache.set('twPlayerCache', playerId, +data.allyCode, data)
    }
    if(!data) data = await getPlayer({ playerId: playerId }, { collection: 'twPlayerCache'}, false)
    return data
  }catch(e){
    throw(e)
  }
}
module.exports = async(members = [], projection)=>{
  try{
    let array = [], res = [], i = members.length
    if(projection) projection.playerId = 1
    const fetchMember = async(playerId, projection)=>{
      let data = await getMember(playerId, projection)
      if(data?.allyCode) res.push(data)
    }
    while(i--) array.push(fetchMember(members[i].playerId, projection))
    await Promise.all(array)
    return res
  }catch(e){
    throw(e)
  }
}
