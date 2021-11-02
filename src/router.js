import { lazy, Suspense } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PageNotFound from "./view/pageNotFound";

import Login from "./view/auth/Login";
import Signup from "./view/auth/Signup";
import Home from "./view/home/index";

import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = [
  {
    path: "/login",
    component: lazy(() => import("./view/auth/Login")),
    exact: true,
  },
  {
    path: "/signup",
    component: lazy(() => import("./view/auth/Signup")),
    exact: true,
  },
  {
    path: "/",
    authRoute: true,
    component: lazy(() => import("./view/home")),
    exact: true,
  },
];

const CustomRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        {/*  <Suspense fallback={null}>
          {AppRoutes.map((single, i) =>
            single?.authRoute ? (
              <Route
                key={i}
                path={single.path}
                component={single.component}
                exact={!!single.exact}
              />
            ) : (
              <ProtectedRoute
                key={i}
                component={single.component}
                path={single.path}
                exact={!!single.exact}
              />
            )
          )} 
        </Suspense>*/}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default CustomRouter;
