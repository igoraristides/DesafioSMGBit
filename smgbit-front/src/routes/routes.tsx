import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Frete from '../pages/frete/Frete';
import UploadPage from '../pages/uploadPage/UploadPage';
import ViewTrip from '../pages/viewTrips/ViewTrip';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/view-trip"
        element={
          <Layout>
            <ViewTrip />
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
            <UploadPage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
