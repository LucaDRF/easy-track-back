import { Model } from 'sequelize';

class BaseModel extends Model {
  static init() {
    this.instances = {};

    return super.init(...arguments);
  }
}

export default BaseModel;
