import UserController from '../controllers/user.js';
import Base from './base.js';

class UserRoutes extends Base {
  constructor() {
    super('/user', UserController);
  }

  load() {
    this.router.post('/login', this.controller.login);
    this.router.get('/:id', this.controller.findInfo);
    this.router.get('/groups/:id', this.controller.findUserGroups);
    this.router.post('/register', this.controller.create);

    this.router.post('/enter/:id/:groupId', this.controller.enterGroup);
    this.router.post('/exit/:id/:groupId', this.controller.exitGroup);
    this.router.post('/confirm/:id/:groupId', this.controller.confirmGroup);
    this.router.post('/desconfirm/:id/:groupId', this.controller.desconfirmGroup);

    return this.router;
  }
}

export default UserRoutes;
