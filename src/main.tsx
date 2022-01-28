import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./index.css";
import { Provider } from "react-redux";
import stores from "./store/store";

ReactDOM.render(
	<Provider store={stores}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById("root")
);
