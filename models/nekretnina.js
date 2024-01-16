const Sequelize = require("sequelize");
const sequelize = require("../public/scripts/baza");

module.exports = function (sequelize, DataTypes) {
  const Nekretnina = sequelize.define("Nekretnina", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    naziv: Sequelize.STRING,
    tip_nekretnine: Sequelize.STRING,
    kvadratura: Sequelize.INTEGER,
    cijena: Sequelize.INTEGER,
    tip_grijanja: Sequelize.STRING,
    lokacija: Sequelize.STRING,
    godina_izgradnje: Sequelize.STRING,
    datum_objave: Sequelize.DATE,
    opis: Sequelize.STRING,
  });
  return Nekretnina;
};
