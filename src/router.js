import { lazy } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PageNotFound from "./view/pageNotFound";

import ProtectedRoute from "./components/ProtectedRoute";
const Signup = lazy(() => import("./view/auth/Signup"));
const Login = lazy(() => import("./view/auth/Login"));
const Home = lazy(() => import("./view/home"));

const CustomRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default CustomRouter;
