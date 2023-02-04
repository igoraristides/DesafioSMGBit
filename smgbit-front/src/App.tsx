import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { ToastContainer, Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

initializeIcons();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer draggable={false} transition={Zoom} />
      </BrowserRouter>
    </div>
  );
}

export default App;
