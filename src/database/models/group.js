import BaseModel from './base.js';

class GroupModel extends BaseModel {
  static load(sequelize, DataTypes) {
    return super.init({
      length: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'group',
      tableName: 'groups',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
      paranoid: false
    });
  }

  static associate(models) {
    this.hasMany(models.UserGroupModel, { foreignKey: 'groupId' });
    this.belongsTo(models.GroupModel, { foreignKey: 'creatorId' });
  }
}

export default GroupModel;
