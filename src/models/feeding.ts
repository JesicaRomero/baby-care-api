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
            type: DataTypes.ENUM('breastfeeding', 'solids', 'bottle'),
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
            type: DataTypes.TIME,
            allowNull: true
        },
        timeRightBreast: {
            type: DataTypes.TIME,
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
        underscored: true
    }
);

export { Feeding };