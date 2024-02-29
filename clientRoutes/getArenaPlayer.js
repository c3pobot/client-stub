'use strict'
const queryArenaPlayer = require('./queryArenaPlayer')
const formatArenaPlayer = require('./format/formatArenaPlayer')
module.exports = async(opt = {})=>{
  try{
    const obj = await queryArenaPlayer(opt)
    if(obj?.allyCode) return await formatArenaPlayer(obj)
  }catch(e){
    throw(e)
  }
}
