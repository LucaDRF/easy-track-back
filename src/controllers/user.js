import UserService from '../services/user.js';
import BaseController from './base.js';

class UserController extends BaseController {
  constructor() {
    super(UserService);

    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.findInfo = this.findInfo.bind(this);
    this.findUserGroups = this.findUserGroups.bind(this);

    this.enterGroup = this.enterGroup.bind(this);
    this.exitGroup = this.exitGroup.bind(this);
    this.confirmGroup = this.confirmGroup.bind(this);
    this.desconfirmGroup = this.desconfirmGroup.bind(this);
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

  async login(req, res) {
    try {
      const user = await this.service.login({
        ...req.body
      });

      this.handleSuccess(res, user);
    } catch (error) {
      this.handleError(res, { message: error });
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
  async exitGroup(req, res) {
    try {
      await this.service.exitGroup(req.params.id, req.params.groupId);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async confirmGroup(req, res) {
    try {
      await this.service.confirmGroup(req.params.id, req.params.groupId);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async desconfirmGroup(req, res) {
    try {
      await this.service.desconfirmGroup(req.params.id, req.params.groupId);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }

}

export default UserController;
