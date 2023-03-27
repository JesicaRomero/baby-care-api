import { Model, DataTypes } from 'sequelize';
import sequelize from '../database'

enum VaccinationPeriod {
    NEWBORN = 'newborn',
    MONTH_2 = 'month_2',
    MONTH_4 = 'month_4',
    MONTH_6 = 'month_6',
    MONTH_11 = 'month_11',
    MONTH_12 = 'month_12',
    MONTH_15 = 'month_15',
}

class Vaccine extends Model { }

Vaccine.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        communityCode: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'autonomous_communities',
                key: 'code',
            },
        },
        period: {
            type: DataTypes.ENUM(VaccinationPeriod.NEWBORN, VaccinationPeriod.MONTH_2, VaccinationPeriod.MONTH_4, VaccinationPeriod.MONTH_6, VaccinationPeriod.MONTH_11, VaccinationPeriod.MONTH_12, VaccinationPeriod.MONTH_15),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'vaccines',
        timestamps: false,
    }
);

export { Vaccine };
