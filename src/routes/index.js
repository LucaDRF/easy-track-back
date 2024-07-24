import Base from './base.js';
import GroupRoutes from './group.js';
import UserRoutes from './user.js';

class Routes extends Base {
  constructor() {
    super();
  }

  load() {
    const Routes = [ UserRoutes, GroupRoutes ];

    Routes.forEach(Route => {
      const route = new Route();

      this.router.use(route.path, route.load());
    });

    return this.router;
  }
}

export default Routes;
