import routesConfig from '~/config/routes';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import Category from '~/pages/Category';
import Product from '~/pages/Product';
import User from '~/pages/User';
import Order from '~/pages/Order';
import NotFound from '~/pages/NotFound';

const publicRoutes = [
    {path: routesConfig.home, component: Home },
    {path: routesConfig.login, component: Login, layout: null},
    {path: routesConfig.admin, component: Admin},
    {path: routesConfig.category, component: Category},
    {path: routesConfig.order, component: Order},
    {path: routesConfig.user, component: User},
    {path: routesConfig.product, component: Product},
    {path: routesConfig.notfound, component: NotFound, layout: null},
];

export { publicRoutes };
