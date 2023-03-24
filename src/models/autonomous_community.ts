import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import { Baby } from "./baby";

class AutonomousCommunity extends Model { }

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
        tableName: 'autonomous_communities',
    }
);

AutonomousCommunity.hasOne(Baby, {
    foreignKey:
    {
        name: 'community_code',
        allowNull: true
    }
});

AutonomousCommunity.hasOne(Baby, { foreignKey: 'community_code' });
Baby.belongsTo(AutonomousCommunity, { foreignKey: 'community_code' });

export { AutonomousCommunity }