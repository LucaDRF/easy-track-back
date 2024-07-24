import GroupService from '../services/group.js';
import BaseController from './base.js';

class GroupController extends BaseController {
  constructor() {
    super(GroupService);

    this.create = this.create.bind(this);
    this.findInfo = this.findInfo.bind(this);
    this.findAll = this.findAll.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      await this.service.create({
        ...req.body,
        filename: req.file.filename,
        creatorId: req.params.userId
      });

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async findInfo(req, res) {
    try {
      const group = await this.service.listOne(req.params.id);

      this.handleSuccess(res, { group });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async findAll(req, res) {
    try {
      const groups = await this.service.findAllWithUsers();

      this.handleSuccess(res, { groups });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req, res) {
    try {
      await this.service.deleteGroup(req.params.id, req.params.userId);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

export default GroupController;
