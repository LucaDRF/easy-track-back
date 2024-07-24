import BaseModel from './base.js';

class UserGroupModel extends BaseModel {
  static load(sequelize, DataTypes) {
    return super.init({
      isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'user_group',
      tableName: 'user_groups',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
      paranoid: false
    });
  }

  static associate(models) {
    this.belongsTo(models.UserModel, { foreignKey: 'userId' });
    this.belongsTo(models.GroupModel, { foreignKey: 'groupId' });
  }
}

export default UserGroupModel;
