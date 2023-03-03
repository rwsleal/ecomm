/* eslint-disable */

'use strict';
const { Model, DataTypes } = require('sequelize');

const attributes = {
  description: {
    allowNull: false,
    type: DataTypes.JSON,
  },
};

module.exports = (sequelize, _DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoices.belongsTo(models.Payments, {
        foreignKey: 'payment_id',
      });
    }
  }
  Invoices.init(attributes, {
    sequelize,
    modelName: 'Invoices',
    tableName: 'Invoices',
    underscored: true,
  });
  return Invoices;
};