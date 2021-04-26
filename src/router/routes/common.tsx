import Home from '../../views/Home';
import About from '../../views/About';
import GameTicTacToe from '../../components/games/TicTacToe';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/tictactoe',
    component: GameTicTacToe
  }
];

export default routes;
