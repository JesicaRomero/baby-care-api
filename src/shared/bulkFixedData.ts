import { Vaccine, AutonomousCommunity } from "../models";

const vaccinesData = [
    { community_code: null, period: 'newborn', description: 'Hepatitis B' },
    { community_code: null, period: 'month_2', description: 'Difteria, tétanos, tosferina (DTPa/VPI/Hib/HB), Enfermedad meningocócica (Men B, Men C, MenACWY)' },
    { community_code: null, period: 'month_4', description: 'Difteria, tétanos, tosferina (DTPa/VPI/Hib/HB), Enfermedad meningocócica (Men B, Men C, MenACWY)' },
    { community_code: null, period: 'month_6', description: 'Difteria, tétanos, tosferina (DTPa/VPI/Hib/HB), Gripe' },
    { community_code: null, period: 'month_11', description: 'Poliomielitis, Difteria, tétanos, tosferina (DTPa/VPI/Hib/HB), Haemophilus influenzae b, Hepatitis B, Enfermedad neumocócica, Gripe' },
    { community_code: null, period: 'month_12', description: 'Sarampión, rubeola, parotiditis, Enfermedad meningocócica (Men B, Men C, MenACWY), Gripe' },
    { community_code: null, period: 'month_15', description: 'Varicela (VVZ), Gripe' },
];

const autonomousCommunities = [
    { code: 1, name: 'Andalucía' },
    { code: 2, name: 'Aragón' },
    { code: 3, name: 'Asturias' },
    { code: 4, name: 'Baleares' },
    { code: 5, name: 'Canarias' },
    { code: 6, name: 'Cantabri' },
    { code: 7, name: 'Castilla La Mancha' },
    { code: 8, name: 'Castilla y León' },
    { code: 9, name: 'Cataluña' },
    { code: 10, name: 'Extremadura' },
    { code: 11, name: 'Galicia ' },
    { code: 12, name: 'Madrid ' },
    { code: 13, name: 'Murcia ' },
    { code: 14, name: 'Navarra' },
    { code: 15, name: 'País Vasco' },
    { code: 16, name: 'La Rioja' },
    { code: 17, name: 'Valencia' },
];

const createCommunities = async () => {
    const communities = await AutonomousCommunity.findAll();
    if (communities.length === 0) {
        await AutonomousCommunity.bulkCreate(autonomousCommunities)
            .then(() => console.log('** Comunidades Autónomas creadas **'));
    }
}

const createVaccines = async () => {
    const vaccines = await Vaccine.findAll();
    if (vaccines.length === 0) {
        await Vaccine.bulkCreate(vaccinesData)
            .then(() => console.log('** Vaccines - without community- created successfully **'));
    }
};

export { createCommunities, createVaccines };