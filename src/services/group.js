import BaseService from './base.js';
import UserGroupModel from '../database/models/user_group.js';
import GroupModel from '../database/models/group.js';
import UserModel from '../database/models/user.js';

class GroupService extends BaseService {
  constructor() {
    super(GroupModel);
  }

  async findAllWithUsers() {
    let data = await this.findAll({
      raw: false,
      where: {
        isDeleted: false
      },
      include: [{
        model: UserModel,
        where: { isDeleted: false },
        required: true
      }, {
        where: { isDeleted: false },
        required: false,
        model: UserGroupModel
      }]
    });

    data = JSON.parse(JSON.stringify(data));

    data.forEach(group => {
      const date = new Date(group.startDate);

      group.hour = `${date.getHours() === 0 ? '00' : date.getHours()}:${date.getMinutes()}`;
      group.date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
      group.people = group.user_groups.length;
    });


    return data;
  }

  async deleteGroup(groupId, userId) {
    const group = await this.findOne({
      where: {
        id: groupId
      }
    });

    if (group.creatorId !== userId) return;

    return this.delete({ where: { id: groupId }});
  }

  async listOne(id) {
    let group = await this.findOne({
      raw: false,
      where: {
        id,
        isDeleted: false
      },
      include: [{
        model: UserModel,
        where: { isDeleted: false },
        required: true
      }, {
        model: UserGroupModel,
        where: {
          isDeleted: false
        },
        required: false,
        include: {
          model: UserModel,
          where: {
            isDeleted: false
          },
          required: false
        }
      }]
    });

    group = JSON.parse(JSON.stringify(group));

    const date = new Date(group.startDate);

    group.hour = `${date.getHours() === 0 ? '00' : date.getHours()}:${date.getMinutes()}`;
    group.date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    group.people = group.user_groups.length;

    return {
      ...group,
      fileUrl: group.filename && `http://localhost:3000/images/${group.filename}`
    };
  }
}

export default GroupService;
