import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../database';
import { Baby } from './baby';

class Appointment extends Model {}

Appointment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'appointments',
  }
);

Baby.hasMany(Appointment, { foreignKey: 'babyId' });
Appointment.belongsTo(Baby, { foreignKey: 'babyId' });

export { Appointment };
