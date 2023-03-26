import { DataTypes, Model, UUIDV4 } from 'sequelize'
import sequelize from '../database'
import { Feeding } from './feeding'

class Baby extends Model { }

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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    communityCode: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "autonomous_communities",
        key: "code"
      },
      onDelete: "CASCADE"
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: 'babies',
  }
)

Baby.hasMany(Feeding, { foreignKey: 'baby_id' })
Feeding.belongsTo(Baby, { foreignKey: 'baby_id' })

export { Baby }
