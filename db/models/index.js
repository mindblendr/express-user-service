'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize;
sequelize = new Sequelize(process.env.MAIN_DB_URL);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

  db[modelName].paginate = async (options) => {
    let { where, order_by, limit, page_no } = options;
    page_no = typeof page_no != 'undefined' ? page_no : 1;
    let order = [];
    if (typeof order != 'undefined') {
      for (const key in order) {
        if (Object.hasOwnProperty.call(order, key)) {
          const asc = order[key];
          order.push([key, asc]);
        }
      }
    } else {
      order = [['id', 'desc']];
    }

    limit = typeof limit != 'undefined' ? limit : 50;
    let offset = (page_no - 1) * limit;
    let result = await db[modelName].findAndCountAll({ where, order, limit, offset });
    let no_of_pages = parseInt(result.count / limit) + (result.count % limit !== 0 ? 1 : 0);
    return {
      total: result.count,
      data: result.rows,
      page_no,
      limit,
      no_of_pages
    };
  }
  
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
