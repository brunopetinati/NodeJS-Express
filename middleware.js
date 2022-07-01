function logger(req, res, next){
  console.log('middleware logger:', req.originalUrl)
  next()
}
module.exports = logger 