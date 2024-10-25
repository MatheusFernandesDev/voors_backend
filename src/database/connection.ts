import { Sequelize } from 'sequelize-typescript';
import viasoft_core from '../config/database';
import { Orders } from '../app/models/Order';
import { OrderItems } from '../app/models/OrderItems';
import { Sizes } from '../app/models/Size';
import { Flavors } from '../app/models/Flavor';
import { Customizes } from '../app/models/Customize';

class Database {
  connection: Sequelize | undefined;
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize({
      dialect: 'postgres',
      host: viasoft_core.host,
      port: viasoft_core.port,
      username: viasoft_core.username,
      password: viasoft_core.password,
      database: viasoft_core.database,
      models: [Orders, OrderItems, Sizes, Flavors, Customizes],
      define: {
        timestamps: viasoft_core.define.timestamps,
        underscored: viasoft_core.define.underscored,
      },
      logging: viasoft_core.logging,
    });

    this.connection.addModels([Orders]);
  }
}

export default new Database();
