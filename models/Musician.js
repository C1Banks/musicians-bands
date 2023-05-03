const {sequelize, DataTypes, Model} = require('../db.js');

class Musician extends Model {}

Musician.init(
    {
        name: DataTypes.STRING,
        instrument: DataTypes.STRING
    },
    {
        sequelize: sequelize,
        modelName: "Musician"
    }
);

module.exports = {
    Musician
};