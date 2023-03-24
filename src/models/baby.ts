import { DataTypes, Model } from 'sequelize'
import sequelize from '../database'

class Baby extends Model { }

Baby.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'babies',
    }
);

export { Baby }
