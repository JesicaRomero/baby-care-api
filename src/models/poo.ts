import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../database';
import { Baby } from './baby';

enum PooColor {
  BLACK = 'black',
  BROWN = 'brown',
  GREEN = 'green',
  YELLOW = 'yellow',
}

enum PooConsistency {
  SOFT = 'soft',
  HARD = 'hard',
  NORMAL = 'normal',
  DIARRHEA = 'diarrhea',
}

const PooColorValues = Object.values(PooColor);
const PooConsistencyValues = Object.values(PooConsistency);

class Poo extends Model {}

Poo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    color: {
      type: DataTypes.ENUM(...PooColorValues),
      allowNull: false,
    },
    consistency: {
      type: DataTypes.ENUM(...PooConsistencyValues),
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
