import dotenv from 'dotenv'

import app from './app'
import sequelize from './database'

dotenv.config({ path: __dirname + '.env' })
console.log(process.env);
const port = process.env.PORT || 3000

const runServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await sequelize.sync({ alter: true, force: true })
    console.log('Models synchronized successfully.')

    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error('Could not run server:', error)
  }
}

runServer()
