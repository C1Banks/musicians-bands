const {sequelize, DataTypes, Model} = require('../db.js');

class Band extends Model {}

Band.init(
    {
        name: DataTypes.STRING,
        genre: DataTypes.STRING
    },
    {
        sequelize: sequelize,
        modelName: "Band"
    }
);

module.exports = {
    Band
};