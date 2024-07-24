import Sequelize from 'sequelize';

import databaseConfig from './config.js';

import UserModel from './models/user.js';
import GroupModel from './models/group.js';
import UserGroupModel from './models/user_group.js';

class Database {
  constructor() {
    this.models = {};

    this.connection = new Sequelize(
      databaseConfig.url,
      databaseConfig.options
    );
  }

  loadModels() {
    const modelsToLoad = [ UserModel, GroupModel, UserGroupModel ];

    modelsToLoad.forEach(model => {
      this.models[model.name] = model.load(this.connection, Sequelize);
    });
  }

  associateModels() {
    Object.values(this.models)
      .filter(model => typeof model.associate === 'function')
      .forEach(model => {
        model.models = this.models;
        model.sequelize = this.connection;
        model.associate(this.models);

        if (model.options && model.options.cache) {
          // SequelizeCache(model).init();
        }
      });
  }

  async startConnection() {
    try {
      await this.connection.authenticate();
    } catch (error) {
      console.log(`Database connection error: ${error}`); // eslint-disable-line no-console
    }
  }

  async disconnect() {
    try {
      await this.connection.close();

      console.log('Database is disconnected.'); // eslint-disable-line no-console
    } catch (error) {
      console.log(`Database disconnection error: ${error}`); // eslint-disable-line no-console
    }
  }

  setup() {
    this.loadModels();
    this.associateModels();

    return this.startConnection();
  }
}

export default Database;
