const log = require('logger')
let logLevel = process.env.LOG_LEVEL || log.Level.INFO;
log.setLevel(logLevel);
const processAPIRequest = require('./processAPIRequest')
const clientRoutes = require('./clientRoutes')
module.exports.post = async(method, opt = {}, identity = null)=>{
  try{
    if(method){
      if(clientRoutes[method]){
        return await clientRoutes[method](opt, identity)
      }else{
        return await processAPIRequest(method, opt, identity)
      }
    }
  }catch(e){
    log.error(e)
  }
}
module.exports.oauth = require('./oauth')
module.exports.Google = require('./google')
