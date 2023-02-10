import { ThemeProvider } from '@mui/material/styles';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { ConstanthPathEnum } from './constanth/constanth.path';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminCompanies from './pages/Admin/AdminComapnies';
import AdminProductDetail from './pages/Admin/AdminProductDetail';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminShops from './pages/Admin/AdminShops';
import ProductAdd from './pages/Admin/ProductAdd';
import { ChatList } from './pages/Chat';
import { ChatMessages } from './pages/Chat/ChatMessages';
import Companies from './pages/Companies/Companies';
import HomePage from './pages/HomePage/HomePage';
import PrivateRoutes, {
  LoggedInRoutes,
} from './pages/PrivateRoutes/PrivateRoutes';
import Products from './pages/Products/Products';
import ProductDetail from './pages/Products/ProductShop/ProductDetail/ProductDetail';
import ProductShop from './pages/Products/ProductShop/ProductShop';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { myTheme } from './styles/myTheme';

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={myTheme}>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path={ConstanthPathEnum.HOME_PAGE}
              element={<HomePage />}
              index
            />
            <Route
              path={ConstanthPathEnum.PRODUCT_CATEGORY}
              element={<Products />}
            />
            <Route
              path={ConstanthPathEnum.PRODUCT_SEARCH}
              element={<Products />}
            />
            <Route
              path={ConstanthPathEnum.PRODUCT_SHOP}
              element={<ProductShop />}
            />
            <Route
              path={ConstanthPathEnum.PRODUCT_DETAIL}
              element={<ProductDetail />}
            />
            <Route
              path={ConstanthPathEnum.COMPANY_LIST}
              element={<Companies />}
            />
            <Route path={ConstanthPathEnum.SIGN_IN} element={<SignIn />} />
            <Route path={ConstanthPathEnum.SIGN_UP} element={<SignUp />} />
            <Route element={<PrivateRoutes />}>
              <Route
                path={ConstanthPathEnum.ADMIN_PRODUCT}
                element={<AdminProducts />}
              />
              <Route
                path={ConstanthPathEnum.ADMIN_PRODUCT_ADD}
                element={<ProductAdd />}
              />
              <Route
                path={ConstanthPathEnum.ADMIN_PRODUCT_DETAIL}
                element={<AdminProductDetail />}
              />
              <Route
                path={ConstanthPathEnum.ADMIN_SHOP}
                element={<AdminShops />}
              />
              <Route
                path={ConstanthPathEnum.ADMIN_CATEGORY}
                element={<AdminCategories />}
              />
              <Route
                path={ConstanthPathEnum.ADMIN_COMPANY}
                element={<AdminCompanies />}
              />
            </Route>
            <Route element={<LoggedInRoutes />}>
              <Route
                path={ConstanthPathEnum.CHAT_INDEX}
                element={<ChatList />}
              />
              <Route
                path={ConstanthPathEnum.CHAT_MESSAGE}
                element={<ChatMessages />}
              />
            </Route>
          </Routes>
          {/* <Footer /> */}
        </div>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
