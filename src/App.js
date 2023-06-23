import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './Pages/LoginPage';
import store from './redux/store/store';
import Reservation from './components/Reservation/Reservation';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/bookvespa" element={<Reservation />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
