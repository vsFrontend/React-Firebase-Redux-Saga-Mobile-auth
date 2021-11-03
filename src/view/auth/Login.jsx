import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { phoneProvider } from "../../firebaseconfig";

import Input from "../../components/Input";
import Loading from "../../components/loading/loading";
import { login, socialLogin } from "../../redux/auth/actions";
import PhoneLogin from "../../components/phoneLogin";

function Login() {
  const [inputStates, setInputStates] = useState({ email: "", password: "" });

  const history = useHistory();
  const { loading, error, user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) history.push("/");
  }, [user]);

  const handleSocialLogin = (provider) => {
    dispatch(socialLogin(provider));
  };

  const handleLocalLogin = (e) => {
    e.preventDefault();
    dispatch(login(inputStates));
  };

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      {loading && <Loading />}
      <div className="card d-flex flex-column align-items-center">
        <div className="card-body">
          <h1>Login</h1>
          <form onSubmit={handleLocalLogin}>
            <Input
              type="text"
              label="Email"
              value={inputStates.email}
              setValue={(val) =>
                setInputStates((prev) => ({ ...prev, email: val }))
              }
              placeholder="E-mail Address"
              required
            />
            <Input
              type="password"
              label="Password"
              value={inputStates.password}
              setValue={(val) =>
                setInputStates((prev) => ({ ...prev, password: val }))
              }
              placeholder="Password"
              required
            />
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-outline-primary w-100">
              Login
            </button>
          </form>
          <Link className="btn " to="/signup"> Or Register</Link>
          <hr />
          <button
            className="btn btn-outline-warning w-100  "
            onClick={() => handleSocialLogin("google")}
          >
            Login with Google
          </button>
          <PhoneLogin />
        </div>
      </div>
    </div>
  );
}
export default Login;
