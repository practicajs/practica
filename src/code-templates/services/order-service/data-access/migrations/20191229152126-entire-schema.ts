// ✅ Best Practice: Manage DB schemas explicitly using migrations
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
      },
      paymentTermsInDays: {
        type: Sequelize.INTEGER,
      },
      countryId: {
        type: Sequelize.INTEGER,
      },
      deliveryAddress: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('Country', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
    });

    await queryInterface.bulkInsert(
      'Country',
      [
        {
          name: 'Italy',
        },
        {
          name: 'India',
        },
        {
          name: 'Japan',
        },
      ],
      {}
    );
  },

  down: (queryInterface) => queryInterface.dropTable('Order'),
};
