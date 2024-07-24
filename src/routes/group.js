import GroupController from '../controllers/group.js';
import Base from './base.js';

class GroupRoutes extends Base {
  constructor() {
    super('/groups', GroupController);
  }

  load() {
    this.router.get('/', this.controller.findAll);
    this.router.get('/:id', this.controller.findInfo);
    this.router.delete('/:id/:userId', this.controller.delete);
    this.router.post('/:userId', this.controller.create);

    return this.router;
  }
}

export default GroupRoutes;
