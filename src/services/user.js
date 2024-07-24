import BaseService from './base.js';
import UserModel from '../database/models/user.js';
import UserGroupModel from '../database/models/user_group.js';
import GroupModel from '../database/models/group.js';

class UserService extends BaseService {
  constructor() {
    super(UserModel);
  }

  async login({ email, password }) {
    const userByEmail = await this.findOne({
      where: {
        email,
        isDeleted: false
      }
    });

    if (!userByEmail || userByEmail.password !== password) throw 'LOGIN_INVALID';

    return userByEmail;
  }

  listOne(id) {
    return this.findOne({
      where: {
        id,
        isDeleted: false
      }
    });
  }

  async findUserGroups(id) {
    let data = await UserGroupModel.findAll({
      where: {
        userId: id,
        isDeleted: false
      },
      include: {
        model: GroupModel,
        where: {
          isDeleted: false,
        },
        required: true
      }
    });

    data = JSON.parse(JSON.stringify(data));

    data.forEach(group => {
      const date = new Date(group.group.startDate);

      group.group.hour = `${date.getHours() === 0 ? '00' : date.getHours()}:${date.getMinutes()}`;
      group.group.date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    });

    return data;
  }

  enterGroup(userId, groupId) {
    return UserGroupModel.create({
      userId,
      groupId
    });
  }

  exitGroup(userId, groupId) {
    return UserGroupModel.update({ isDeleted: true } ,{
      where: {
        userId,
        groupId
      }
    });
  }

  confirmGroup(userId, groupId) {
    return UserGroupModel.update({ isConfirmed: true }, {
      where: {
        userId,
        groupId
      }
    });
  }

  desconfirmGroup(userId, groupId) {
    return UserGroupModel.update({ isConfirmed: false }, {
      where: {
        userId,
        groupId
      }
    });
  }
}

export default UserService;
