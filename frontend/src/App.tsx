import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/Products/Products';
import Categories from './pages/Categories/Categories';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/categories' element={<Categories />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<SignUp />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
