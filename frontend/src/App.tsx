import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { ThemeProvider } from "@mui/material/styles";
import { myTheme } from './styles/myTheme';
import { ConstanthPathEnum } from './constanth/constanth.path';
import ProductShop from './pages/Products/ProductShop/ProductShop';
import ProductDetail from './pages/Products/ProductShop/ProductDetail/ProductDetail';
import Products from './pages/Products/Products';
import Companies from './pages/Companies/Companies';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminCompanies from './pages/Admin/AdminComapnies';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminShops from './pages/Admin/AdminShops';
import PrivateRoutes from './pages/PrivateRoutes/PrivateRoutes';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={myTheme}>
        <div className="App">
          <Header />
          <Routes>
            <Route path={ConstanthPathEnum.HOME_PAGE} element={<HomePage />} index />
            <Route path={ConstanthPathEnum.PRODUCT_LIST} element={<Products />} />
            <Route path={ConstanthPathEnum.PRODUCT_CATEGORY} element={<Products />} />
            <Route path={ConstanthPathEnum.PRODUCT_SEARCH} element={<Products />} />
            <Route path={ConstanthPathEnum.PRODUCT_SHOP} element={<ProductShop />} />
            <Route path={ConstanthPathEnum.PRODUCT_DETAIL} element={<ProductDetail />} />
            <Route path={ConstanthPathEnum.COMPANY_LIST} element={<Companies />} />
            <Route path={ConstanthPathEnum.SIGN_IN} element={<SignIn />} />
            <Route path={ConstanthPathEnum.SIGN_UP} element={<SignUp />} />
            <Route element={<PrivateRoutes />}>
              <Route path={ConstanthPathEnum.ADMIN_PRODUCT} element={<AdminProducts />} />
              <Route path={ConstanthPathEnum.ADMIN_SHOP} element={<AdminShops />} />
              <Route path={ConstanthPathEnum.ADMIN_CATEGORY} element={<AdminCategories />} />
              <Route path={ConstanthPathEnum.ADMIN_COMPANY} element={<AdminCompanies />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
