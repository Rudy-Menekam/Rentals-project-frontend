import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './Pages/LoginPage';
import store from './redux/store/store';
import Homepage from './Pages/homepage';
import Detailspage from './Pages/detailspage';
import Reservationpage from './Pages/reservationpage';
import Reservationshistory from './Pages/reservationshistory';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route
              path="/detailsPage/:id"
              element={<Detailspage />}
            />
            <Route
              path="/addItem"
              element={<Reservationpage />}
            />
            <Route
              path="/deleteItem"
              element={<Reservationshistory />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>

    </div>
  );
}

export default App;
