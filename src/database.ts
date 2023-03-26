import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import { AutonomousCommunity } from './models'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
  }
)

export const connect = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export const sync = async () => {
  await sequelize.sync({ alter: true, force: true })
  console.log('Models synchronized successfully.')
}

export const populateAutonomousCommunity = async () => {
  const communities = await AutonomousCommunity.findAll()
  if (communities.length === 0) {
    AutonomousCommunity.bulkCreate([
      { code: 1, name: 'Andalucía' },
      { code: 2, name: 'Aragón' },
      { code: 3, name: 'Asturias' },
      { code: 4, name: 'Baleares' },
      { code: 5, name: 'Canarias' },
      { code: 6, name: 'Cantabri' },
      { code: 7, name: 'Castilla La Mancha' },
      { code: 8, name: 'Castilla y León' },
      { code: 9, name: 'Cataluña' },
      { code: 10, name: 'Extremadura' },
      { code: 11, name: 'Galicia ' },
      { code: 12, name: 'Madrid ' },
      { code: 13, name: 'Murcia ' },
      { code: 14, name: 'Navarra' },
      { code: 15, name: 'País Vasco' },
      { code: 16, name: 'La Rioja' },
      { code: 17, name: 'Valencia' },
    ]).then(() => console.log('** Comunidades Autónomas creadas **'))
  }
}

export default sequelize
