import BaseService from './base.js';
import UserModel from '../database/models/user.js';
import UserGroupModel from '../database/models/user_group.js';
import GroupModel from '../database/models/group.js';

class UserService extends BaseService {
  constructor() {
    super(UserModel);
  }

  listOne(id) {
    return this.findOne({
      where: {
        id,
        isDeleted: false
      }
    });
  }

  findUserGroups(id) {
    return UserGroupModel.findAll({
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
  }

  enterGroup(userId, groupId) {
    return UserGroupModel.create({
      userId,
      groupId
    });
  }
}

export default UserService;
