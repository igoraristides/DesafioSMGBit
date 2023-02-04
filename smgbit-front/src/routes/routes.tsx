import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Frete from '../pages/frete/Frete';
import Upload from '../pages/upload/Upload';
import Visualizar from '../pages/visualizar/Visualizar';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/visualizar"
        element={
          <Layout>
            <Visualizar />
          </Layout>
        }
      />
      <Route
        path="/fretes"
        element={
          <Layout>
            <Frete />
          </Layout>
        }
      />
      <Route
        path="/"
        element={
          <Layout>
            <Upload />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
