import InventoryList from './InventoryList.jsx';
import ProductReport from './ProductReport.jsx';
import ProductEdit from './ProductEdit.jsx';
import About from './About.jsx';
import NotFound from './NotFound.jsx';
import AccountCreateAndLogin from './AccountCreateAndLogin.jsx';

const routes = [
    { path: '/products', component: InventoryList },
    { path: '/edit/:id', component: ProductEdit },
    { path: '/report', component: ProductReport },
    { path: '/about', component: About },
    { path: '/sign-in', component: AccountCreateAndLogin },
    { path: '*', component: NotFound },
];
export default routes;
