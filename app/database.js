const { Sequelize } = require('sequelize');

// 2. Créer une instance de sequelize
sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
}

});

module.exports = sequelize;