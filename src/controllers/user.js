import UserService from '../services/user.js';
import BaseController from './base.js';

class UserController extends BaseController {
  constructor() {
    super(UserService);

    this.create = this.create.bind(this);
    this.findInfo = this.findInfo.bind(this);
    this.findUserGroups = this.findUserGroups.bind(this);
    this.enterGroup = this.enterGroup.bind(this);
  }

  async create(req, res) {
    try {
      await this.service.create({
        ...req.body
      });

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async findInfo(req, res) {
    try {
      const userInfo = await this.service.listOne(req.params.id);

      this.handleSuccess(res, { userInfo });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async findUserGroups(req, res) {
    try {
      const userGroups = await this.service.findUserGroups(req.params.id);

      this.handleSuccess(res, { userGroups });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async enterGroup(req, res) {
    try {
      await this.service.enterGroup(req.params.id, req.params.groupId);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

export default UserController;
