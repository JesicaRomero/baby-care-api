import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../database';
import { Baby } from './baby';

class Poo extends Model {}

Poo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    color: {
      type: DataTypes.ENUM('BLACK', 'BROWN', 'YELLOW', 'GREEN'),
      allowNull: false,
    },
    consistency: {
      type: DataTypes.ENUM('SOFT', 'HARD', 'NORMAL', 'DIARRHEA'),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'poos',
  }
);

Baby.hasMany(Poo, { foreignKey: 'babyId' });
Poo.belongsTo(Baby, { foreignKey: 'babyId' });

export { Poo };
