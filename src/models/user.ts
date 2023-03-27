import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../database';
import { Baby } from './baby';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'users',
  }
);

User.hasOne(Baby, { foreignKey: 'userId' });
Baby.belongsTo(User, { foreignKey: 'userId' });

export { User };
