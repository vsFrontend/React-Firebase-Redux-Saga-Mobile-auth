import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Input from "../../components/Input";
import Loading from "../../components/loading/loading";
import { login, socialLogin } from "../../redux/auth/actions";

function Login() {
  const [inputStates, setInputStates] = useState({ email: "", password: "" });

  const history = useHistory();
  const { loading, error, user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) history.push("/");
  }, [user]);

  const handleSocialLogin = () => {
    dispatch(socialLogin("google"));
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
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <hr />
          <button className="btn btn-info" onClick={handleSocialLogin}>
            Login with Google
          </button>
          <div>
            Don't have an account? <Link to="/signup">Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
