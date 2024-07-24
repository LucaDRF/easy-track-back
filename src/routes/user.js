import UserController from '../controllers/user.js';
import Base from './base.js';

class UserRoutes extends Base {
  constructor() {
    super('/user', UserController);
  }

  load() {
    this.router.get('/:id', this.controller.findInfo);
    this.router.get('/groups/:id', this.controller.findUserGroups);
    this.router.post('/', this.controller.create);
    this.router.post('/enter/:id/:groupId', this.controller.enterGroup);

    return this.router;
  }
}

export default UserRoutes;
