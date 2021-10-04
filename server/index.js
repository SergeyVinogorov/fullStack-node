const config = require("config");
const mongoose = require("mongoose");
const app = require('./app')
const PORT = config.get('port') || 5000
//  "mongoUri": "mongodb+srv://Sergei:1234mern@cluster0.kl1cq.mongodb.net/app?retryWrites=true&w=majority"
//"mongodb://mongo:27017/mern"
async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, ()=>{
      console.log(`App is running! ${PORT}`)
    })
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}
start()