import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import {  } from "./firebase";
import Input from "../../components/Input";
import Loading from "../../components/loading/loading";
import { login, socialLogin } from "../../redux/auth/actions";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { loading, error, user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (user) history.push("/");
    // const REACT_APP_apiKey = process.env.REACT_APP_apiKey
    // debugger
  }, [user]);

  const handleSocialLogin = () => {
    dispatch(socialLogin());
  };
  const handleLocalLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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
              value={email}
              setValue={setEmail}
              placeholder="E-mail Address"
              required
            />
            <Input
              type="password"
              label="Password"
              value={password}
              setValue={setPassword}
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
