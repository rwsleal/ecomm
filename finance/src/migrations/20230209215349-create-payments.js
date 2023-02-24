/* eslint-disable strict */
/* eslint-disable max-lines-per-function */

'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.DECIMAL,
      },
      cardName: {
        type: Sequelize.STRING,
        field: 'card_name',
      },
      cardNumber: {
        type: Sequelize.STRING,
        field: 'card_number',
      },
      expirationDate: {
        type: Sequelize.STRING,
        field: 'expiration_date',
      },
      cvv: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Payments');
  },
};