import { AppRoute } from './Routes';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import PageLoader from './Components/Loader/Loader';
import { Provider } from 'react-redux'
import {store, persistor} from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Suspense fallback={<PageLoader/>}>
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
					<AppRoute/>
				</Suspense>
			</PersistGate>
		</Provider>
    </BrowserRouter>
  );
}

export default App;
