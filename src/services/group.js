import BaseService from './base.js';
import UserGroupModel from '../database/models/user_group.js';
import GroupModel from '../database/models/group.js';

class GroupService extends BaseService {
  constructor() {
    super(GroupModel);
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

  listOne(id) {
    return this.findOne({
      logging: true,
      where: {
        id,
        isDeleted: false
      },
      include: {
        model: UserGroupModel,
        where: {
          isDeleted: false
        },
        required: false
      }
    });
  }
}

export default GroupService;
