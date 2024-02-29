'use strict'
const log = require('logger')
const statCalc = require('statcalc')
module.exports.setGameData = async(gameData = {})=>{
  try{
    return await statCalc.setGameData(gameData)
  }catch(e){
    throw(e)
  }
}
module.exports.calcRosterStats = async(units = [])=>{
  try{
    return await statCalc.calcRosterStats(units)
  }catch(e){
    throw(e)
  }
}
