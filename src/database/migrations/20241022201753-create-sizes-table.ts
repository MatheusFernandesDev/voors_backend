import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('sizes', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      preparation_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }),
      await queryInterface.bulkInsert('sizes', [
        {
          id: 'dbca2594-f8dc-4634-9201-47a7f367d654',
          name: 'pequena',
          price: 20.2,
          preparation_time: 15,
        },
        {
          id: '2b1c7250-91aa-11ef-b864-0242ac120002',
          name: 'média',
          price: 30.3,
          preparation_time: 20,
        },
        {
          id: '3042fe8e-91aa-11ef-b864-0242ac120002',
          name: 'grande',
          price: 40.0,
          preparation_time: 25,
        },
      ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('sizes');
  },
};
