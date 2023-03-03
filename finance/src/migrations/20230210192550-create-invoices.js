/* eslint-disable strict */
/* eslint-disable max-lines-per-function */

'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.JSON,
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'payment_id',
        references: { model: 'Payments', key: 'id' },
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
    await queryInterface.dropTable('Invoices');
  },
};