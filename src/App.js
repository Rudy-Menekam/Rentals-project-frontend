import Reservationpage from './Pages/reservationpage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './Pages/LoginPage';
import store from './redux/store/store';

function App() {
  return (
    <div className="App">

      <Reservationpage />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
