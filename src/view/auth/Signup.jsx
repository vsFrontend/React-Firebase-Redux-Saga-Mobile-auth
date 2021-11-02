import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Input from "../../components/Input";
import Loading from "../../components/loading/loading";
import { registerLocal, socialLogin } from "../../redux/auth/actions";

function Login() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector(({ auth }) => auth);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerLocal({
        data: { name, email, password },
        callback: () => {
          history.push("/");
        },
      })
    );
  };

  const handleSocialLogin = () => {
    dispatch(socialLogin());
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
              value={name}
              setValue={setname}
              required
            />
            <Input
              type="email"
              required
              label="Email"
              value={email}
              setValue={setemail}
            />
            <Input
              type="password"
              label="Password"
              className="form-control"
              value={password}
              setValue={setpassword}
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
