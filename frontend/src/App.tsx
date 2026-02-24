import HomePage from './Container/HomePage/HomePage';
import Items from './Container/Items/Items';
import Suppliers from './Container/Suppliers/Suppliers';
import Categories from './Container/Categories/Categories';
import Register from './Container/Register/Register';
import Login from './Container/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './Store/hooks';
import AppToolBar from './Components/UI/Layout/AppToolbar/ApptoolBar';
import EditItem from './Container/Items/EditItem';
import EditSupplier from './Container/Suppliers/EditSupplier';
import AddSupply from './Components/Invoices/AddInvoice';
import Recipes from './Container/Recipes/Recipes';
import AddRecipes from './Container/Recipes/AddRecipes';
import Invoices from './Components/Invoices/Invoices';
import SendShowcase from './Container/SendShowcase/SendShowcase';
import ShowcaseBouquets from './Container/ShowcaseBouquets/ShowcaseBouquets';
import { getUser } from './Store/user/userSelectors';
import DetailShowcaseBouquets from './Container/DetailShowcaseBouquet/DetailShowcaseBoquet';
import FloristPage from './Container/FloristPage/FloristPage';
import CartToolBar from './Components/UI/Layout/AppToolbar/CartToolBar';
import Orders from './Container/Orders/Orders';
import InvoiceContainer from './Container/Invoice/InvoiceContainer';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
	CssBaseline,
	PaletteMode,
	createTheme,
	ThemeProvider,
} from '@mui/material';
import { grey, blue, blueGrey } from '@mui/material/colors';
import OrdersDetails from './Container/Orders/OrdersDetails';
import EditCategory from './Container/Categories/EditCategory';

const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		primary: {
			...blue,
			main: mode === 'light' ? blue[500] : blue[400],
		},
		background: {
			default: mode === 'light' ? '#fff' : '#383b48',
			paper: mode === 'light' ? '#383b48' : blueGrey[900],
		},
		text: {
			primary: mode === 'light' ? blue[700] : blue[50],
			secondary: mode === 'light' ? grey[500] : grey[300],
		},
	},
});

const modeTheme = createTheme(getDesignTokens('light'));
function App() {
	const user = useAppSelector(getUser);
	const location = useLocation();
	const isFloristPage = location.pathname === '/florist_page';

	return (
		<ThemeProvider theme={modeTheme}>
			<CssBaseline>
				<header>
					<AppToolBar />
					{isFloristPage && <CartToolBar />}
				</header>
				<main>
					<Routes>
						<Route
							path="/register"
							element={
								<Register />
							}
						/>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/login"
							element={
								<Login />
							}
						/>
						<Route
							path="/items"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<Items />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/suppliers"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<Suppliers />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/edit-item/:id"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<EditItem />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/edit-supplier/:id"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<EditSupplier />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/invoices"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<Invoices />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/invoices/:id"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<InvoiceContainer />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/new-invoice"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<AddSupply />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/items_categories"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<Categories />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/edit-category/:id"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<EditCategory />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/recipes"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<Recipes />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/new-recipes/:id"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<AddRecipes />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/sendshowcase"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<SendShowcase />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/orders"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<Orders />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/orders/:id"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<OrdersDetails />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/available_bouquets"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<ShowcaseBouquets />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/detailBouquet/:id"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<DetailShowcaseBouquets />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/florist_page"
							element={
								<ProtectedRoute
									isAllowed={user.isAuthenticated}
									redirectPath="/"
								>
									<FloristPage />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</main>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
