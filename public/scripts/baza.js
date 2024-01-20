const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306,
});

const db = {};

const Nekretnina = require("../../models/nekretnina.js")(sequelize);
const Upit = require("../../models/upit.js")(sequelize);
const Korisnik = require("../../models/korisnik.js")(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Nekretnina = Nekretnina;
db.Upit = Upit;
db.Korisnik = Korisnik;

Nekretnina.hasMany(Upit);
Upit.belongsTo(Nekretnina);

Korisnik.hasMany(Upit);
Upit.belongsTo(Korisnik);

module.exports = db;
