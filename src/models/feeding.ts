import { Model, DataTypes } from 'sequelize';
import sequelize from '../database'
import { Baby } from './baby'

class Feeding extends Model { }

Feeding.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM('BREASTFEEDING', 'BOTTLE', 'SOLIDS'),
            allowNull: false
        },
        babyId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "babies",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        timeLeftBreast: {
            type: DataTypes.STRING,
            allowNull: true
        },
        timeRightBreast: {
            type: DataTypes.STRING,
            allowNull: true
        },
        amountBottle: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        amountSolids: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: 'feedings',
        timestamps: false,
    }
);

export { Feeding };