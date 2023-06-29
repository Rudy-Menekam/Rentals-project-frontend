import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './Pages/LoginPage';
import store from './redux/store/store';
import Homepage from './Pages/homepage';
import Detailspage from './Pages/detailspage';
import Reservationpage from './Pages/reservationpage';
import Reservationshistory from './Pages/reservationshistory';
import Reservation from './components/Reservation/Reservation';
import ProtectedRoute from './Pages/ProtectedRoute';
import MyReservations from './components/Reservation/MyReservations';

const App = () => (
  <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/homepage"
            element={(
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/detailsPage/:id"
            element={(
              <ProtectedRoute>
                <Detailspage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/addItem"
            element={(
              <ProtectedRoute>
                <Reservationpage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/deleteItem"
            element={
              <Reservationshistory />
            }
          />
          <Route
            path="/bookride"
            element={(
              <ProtectedRoute>
                <Reservation />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/myreservations"
            element={(
              <ProtectedRoute>
                <MyReservations />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
