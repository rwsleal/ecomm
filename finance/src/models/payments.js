'use strict';

const { Model, DataTypes } = require('sequelize');

const attributes = {
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  cardName: {
    field: 'card_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardNumber: {
    field: 'card_number',
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isCreditCard: true,
    },
  },
  expirationDate: {
    field: 'expiration_date',
    type: DataTypes.STRING,
    allowNull: false,
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]{3}$/,
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['CRIADO', 'CONFIRMADO', 'CANCELADO']],
    },
  },
};

module.exports = (sequelize, _DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payments.init(attributes, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};