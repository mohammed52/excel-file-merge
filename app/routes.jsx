import React from "react";
import { Route, IndexRoute } from "react-router";
import { fetchVoteData } from "./fetch-data";
import {
  App,
  Home,
  Dashboard,
  About,
  LoginOrRegister,
  NewPalletRackProjectPage,
  ShowQuotePage
} from "./pages";

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default store => {
  const requireAuth = (nextState, replace, callback) => {
    const {
      user: { authenticated }
    } = store.getState();
    if (!authenticated) {
      replace({
        pathname: "/login",
        state: {
          nextPathname: nextState.location.pathname
        }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    // console.log("store.getState()", store.getState())
    const {
      user: { authenticated }
    } = store.getState();
    // if (authenticated) {
    //   replace({
    //     pathname: '/'
    //   });
    // }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} fetchData={null} onEnter={requireAuth} />
      <Route
        path="newpalletrackproject"
        component={NewPalletRackProjectPage}
        onEnter={requireAuth}
      />
      <Route path="showquote" component={ShowQuotePage} onEnter={requireAuth} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
    </Route>
  );
};
