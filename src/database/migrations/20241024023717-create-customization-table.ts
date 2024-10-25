import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('customization', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      extra_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      extra_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }),
      await queryInterface.bulkInsert('customization', [
        {
          id: 'eef0d246-91b1-11ef-b864-0242ac120002',
          name: 'extra bacon',
          extra_price: 3,
          extra_time: 0,
        },
        {
          id: 'f5c3283a-91b1-11ef-b864-0242ac120002',
          name: 'sem cebola',
          extra_price: 0,
          extra_time: 0,
        },
        {
          id: 'fb718416-91b1-11ef-b864-0242ac120002',
          name: 'borda recheada',
          extra_price: 5,
          extra_time: 5,
        },
      ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('customization');
  },
};
