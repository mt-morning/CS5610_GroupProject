import InventoryList from './InventoryList.jsx';
import ProductEdit from './ProductEdit.jsx';
import About from './About.jsx';
import NotFound from './NotFound.jsx';
import AccountCreateAndLogin from './AccountCreateAndLogin.jsx';
import OrderList from './OrderList.jsx';

const routes = [
  { path: '/products', component: InventoryList },
  { path: '/edit/:id', component: ProductEdit },
  { path: '/orders', component: OrderList },
  { path: '/about', component: About },
  { path: '/sign-in', component: AccountCreateAndLogin },
  { path: '*', component: NotFound },
];
export default routes;
