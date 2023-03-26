import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import { Baby } from './baby';

class AutonomousCommunity extends Model {}

AutonomousCommunity.init(
  {
    code: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: 'autonomous_communities',
  }
);

AutonomousCommunity.hasOne(Baby, {
  foreignKey: {
    name: 'communityCode',
    allowNull: true,
  },
});
Baby.belongsTo(AutonomousCommunity, { foreignKey: 'communityCode' });

export { AutonomousCommunity };
