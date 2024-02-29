'use strict'
const mongo = require('mongoclient')
module.exports.set = async(collection, matchCondition, data)=>{
  try{
    return await mongo.set(collection, matchCondition, data)
  }catch(e){
    throw(e)
  }
}
module.exports.get = async(collection, matchCondition, projection)=>{
  try{
    return await mongo.find(collection, matchCondition, projection)
  }catch(e){
    throw(e)
  }
}
