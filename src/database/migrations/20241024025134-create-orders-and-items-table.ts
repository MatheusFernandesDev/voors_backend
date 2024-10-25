import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('orders', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    }),
      await queryInterface.createTable('orders_items', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        order_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'orders',
            key: 'id',
          },
        },

        size_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'sizes',
            key: 'id',
          },
        },

        flavor_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'flavors',
            key: 'id',
          },
        },

        customization_ids: {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
      });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('orders_items');
    await queryInterface.dropTable('orders');
  },
};
