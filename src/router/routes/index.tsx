import common from './common';
import Error404 from '../../views/Error404';

const routes = [
  ...common,
  {
    path: '*',
    component: Error404
  }
];

export default routes;
