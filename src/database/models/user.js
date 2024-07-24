import BaseModel from './base.js';

class UserModel extends BaseModel {
  static load(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: DataTypes.CITEXT,
      gender: {
        type: DataTypes.STRING,
        values: ['masculino', 'feminino', 'outro'],
        allowNull: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: true,
      sequelize: sequelize,
      modelName: 'user',
      tableName: 'users',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
      paranoid: false
    //   hooks: {
    //     beforeCreate: user => {
    //       return user.password = bcryptjs.hashSync(user.password, 8);
    //     },
    //     beforeUpdate: user => {
    //       return user.password = bcryptjs.hashSync(user.password, 8);
    //     }
    //   }
    });
  }

  static associate(models) {
    this.hasMany(models.UserGroupModel, { foreignKey: 'userId' });
    this.hasMany(models.GroupModel, { foreignKey: 'creatorId' });
  }
}

export default UserModel;
