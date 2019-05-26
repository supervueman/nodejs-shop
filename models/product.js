const db = require('../util/database');

const Cart = require('./cart');
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

  }

  static delete(id) {

  }

  static fetchAll(cb) {
    return db.execute('SELECT * FROM products').then().catch();
  }

  static findById(id, cb) {

  }
};
