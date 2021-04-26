import { BrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

export default function App () {
  return (
    <div>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </div>
  );
}
