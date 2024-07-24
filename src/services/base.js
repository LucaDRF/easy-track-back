class BaseService {
  constructor(Model) {
    if (Model === undefined) {
      throw new TypeError('Model cannot be empty');
    }

    this.Model = Model;
  }

  get getModel() {
    return this.Model;
  }

  async exists(options) {
    const item = await this.findOne(options);

    return !!item;
  }

  findAll(options) {
    return this.Model.findAll({
      nest: true,
      raw: true,
      subQuery: false,
      where: {
        isDeleted: false
      },
      ...options
    });
  }

  findAndCountAll(options) {
    return this.Model.findAndCountAll({
      nest: true,
      raw: true,
      subQuery: false,
      ...options
    });
  }

  findOne(options) {
    return this.Model.findOne({
      nest: true,
      raw: true,
      subQuery: false,
      ...options
    });
  }

  create(data, options) {
    return this.Model.create(data, options);
  }

  bulkCreate(data, options) {
    if (!data.length) throw 'DATA_IS_NOT_AN_ARRAY';

    return this.Model.bulkCreate(data, options);
  }

  update(options, changes) {
    return this.Model.update(changes, options);
  }

  destroy(options) {
    return this.Model.destroy({
      ...options,
      force: true
    });
  }

  delete(options) {
    return this.Model.update({ isDeleted: true }, options);
  }
}

export default BaseService;
