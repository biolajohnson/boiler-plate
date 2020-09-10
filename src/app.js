import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import getVisibleExpenses from "./selectors/expenses";
import { startSetExpenses } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import "react-dates/lib/css/_datepicker.css";
import "normalize.css/normalize.css";
import "./styles/style.scss";
import './firebase/firebase'

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

store.dispatch(startSetExpenses()).then(() => {

  ReactDOM.render(jsx, document.getElementById("app"));
})


