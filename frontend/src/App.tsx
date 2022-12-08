import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/Products/Products';
import Categories from './pages/Categories/Categories';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { ThemeProvider } from "@mui/material/styles";
import { myTheme } from './styles/myTheme';
import Book from './components/menuList/Book';
import ProductDetails from './components/ProductDetails';
import { ConstanthPathEnum } from './constanth/constanth.path';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={myTheme}>
        <div className="App">
          <Header />
          <Routes>
            <Route path={ConstanthPathEnum.HOME_PAGE} element={<HomePage />} index />
            <Route path='/book' element={<Book />} index />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<ProductDetails />} index />
            <Route path='/categories' element={<Categories />} />
            <Route path={ConstanthPathEnum.SIGN_IN} element={<SignIn />} />
            <Route path={ConstanthPathEnum.SIGN_UP} element={<SignUp />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
