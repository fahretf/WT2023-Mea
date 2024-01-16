const Sequelize = require("sequelize");
const sequelize = require("../public/scripts/baza");

module.exports = function (sequelize, DataTypes) {
  const Upit = sequelize.define("Upit", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    korisnik_id: Sequelize.INTEGER,
    tekst_upita: Sequelize.STRING,
  });
  return Upit;
};
