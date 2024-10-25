import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('flavors', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      extra_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }),
      await queryInterface.bulkInsert('flavors', [
        {
          id: '09b9eaca-91af-11ef-b864-0242ac120002',
          name: 'calabresa',
          extra_time: 0,
        },
        {
          id: '100d2cca-91af-11ef-b864-0242ac120002',
          name: 'marguerita',

          extra_time: 0,
        },
        {
          id: '193f4fd0-91af-11ef-b864-0242ac120002',
          name: 'portuguesa',

          extra_time: 5,
        },
      ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('flavors');
  },
};
