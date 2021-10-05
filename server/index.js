const mongoose = require("mongoose");
const app = require('./app')
const PORT = process.env.PORT || 5000

async function start() {
  try {
    await mongoose.connect(process.env.DB_URI, {
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