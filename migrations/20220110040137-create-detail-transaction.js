'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detail_transaction', {
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "transaction",
          key: "transaction_id"
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key:"product_id"
        }
      },
      price: {
        type: Sequelize.DOUBLE
      },
      qty: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detail_transaction');
  }
};