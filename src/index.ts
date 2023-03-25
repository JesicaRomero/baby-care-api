import dotenv from 'dotenv'

import app from './app'
import { connect, sync, populateAutonomousCommunity } from './database'

dotenv.config()
const port = process.env.PORT || 3000

const runServer = async () => {
  await connect()
  await sync()
  await populateAutonomousCommunity()

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

runServer()
