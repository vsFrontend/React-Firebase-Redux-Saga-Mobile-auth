import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import Loading from "../../components/loading/loading";
import { registerLocal, socialLogin } from "../../redux/auth/actions";

function Login() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector(({ auth }) => auth);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerLocal({
        data: formValues,
        callback: () => {
          history.push("/");
        },
      })
    );
  };

  const handleSocialLogin = () => {
    dispatch(socialLogin("google"));
  };

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      {loading && <Loading />}
      <div className="card d-flex flex-column align-items-center">
        <h1 className="my-3">Sign Up</h1>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <Input
              type="string"
              label="Name"
              value={formValues.name}
              setValue={(val) => setFormValues({ ...formValues, name: val })}
              required
            />
            <Input
              type="email"
              required
              label="Email"
              value={formValues.email}
              setValue={(val) => setFormValues({ ...formValues, email: val })}
            />
            <Input
              type="password"
              label="Password"
              className="form-control"
              value={formValues.password}
              setValue={(val) =>
                setFormValues({ ...formValues, password: val })
              }
              required
            />
            <button type="submit m-auto" className="btn btn-primary">
              Submit
            </button>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </form>
          <Link className="btn " to="/login"> Or Login</Link>
          <hr />
          <div className="d-flex justify-content-center">
            <button className="btn btn-info" onClick={handleSocialLogin}>
              SignUp With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
