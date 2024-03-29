import { Route, Routes, BrowserRouter} from 'react-router-dom';
import CategoriesManagement from '../categories/categories.jsx';
import ProductsManagement from '../products/products.jsx';
import History from '../history/history.jsx'
import Home from '../index/index.jsx'

const Router =() => {
    return(
        <BrowserRouter>
        <Routes>
        <Route Component = { CategoriesManagement } path="/categories"/>
        <Route Component = { Home } path="/index"/>
        <Route Component = { ProductsManagement } path="/products"/>
        <Route Component = { History } path="/history"/>
        </Routes>
        </BrowserRouter>
    )
}

export default Router;
