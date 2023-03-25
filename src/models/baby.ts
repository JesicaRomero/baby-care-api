import { DataTypes, Model, UUIDV4 } from 'sequelize'
import sequelize from '../database'

class Baby extends Model {}

Baby.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'babies',
  }
)

export { Baby }
