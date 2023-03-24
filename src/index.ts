import dotenv from 'dotenv'

import app from './app'
import sequelize from './database'
import { AutonomousCommunity } from './models'

dotenv.config()
const port = process.env.PORT || 3000

const runServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await sequelize.sync({ alter: true, force: true })
    console.log('Models synchronized successfully.')

    AutonomousCommunity.bulkCreate([
      { code: 1, name: "Andalucía" },
      { code: 2, name: "Aragón" },
      { code: 3, name: "Asturias" },
      { code: 4, name: "Baleares" },
      { code: 5, name: "Canarias" },
      { code: 6, name: "Cantabri" },
      { code: 7, name: "Castilla La Mancha" },
      { code: 8, name: "Castilla y León" },
      { code: 9, name: "Cataluña" },
      { code: 10, name: "Extremadura" },
      { code: 11, name: "Galicia " },
      { code: 12, name: "Madrid " },
      { code: 13, name: "Murcia " },
      { code: 14, name: "Navarra" },
      { code: 15, name: "País Vasco" },
      { code: 16, name: "La Rioja" },
      { code: 17, name: "Valencia" },
    ]).then(() => console.log("** Comunidades Autónomas creadas **"));


    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error('Could not run server:', error)
  }
}

runServer()
