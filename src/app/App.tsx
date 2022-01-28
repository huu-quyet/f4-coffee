import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AdminPage from "../page/AdminPage";
import CustomerPage from "../page/CustomerPage";
import LoginPage from "../page/LoginPage";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={LoginPage} />
				<Route
					path="/admin"
					render={() =>
						window.localStorage.getItem("accessToken") ? (
							<AdminPage />
						) : (
							<Redirect to="/login" />
						)
					}
				/>
				<Route path="/" component={CustomerPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
