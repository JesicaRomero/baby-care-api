import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { AutonomousCommunity } from './models';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    define: {
      underscored: true,
    },
  }
);

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export const sync = async () => {
  await sequelize.sync({ alter: true, force: true });
  console.log('Models synchronized successfully.');
};

export default sequelize;
