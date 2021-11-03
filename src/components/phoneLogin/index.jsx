import React, { useState } from "react";
import Input from "../Input";
// import { firebase, auth } from "./firebase";
import { auth, firebase } from "../../firebaseconfig";
import { useDispatch } from "react-redux";
import { phoneLogin } from "../../redux/auth/actions";

const PhoneLogin = () => {
  // Inputs
  const [mynumber, setnumber] = useState("+923");
  const [otp, setotp] = useState("");
  const [step, setStep] = useState(0);
  const [final, setfinal] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSaveUser = (data) => {
    dispatch(phoneLogin(data));
  };

  // Sent OTP
  const signin = (e) => {
    e.preventDefault();
    if (mynumber === "" || mynumber.length < 10) return;
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(mynumber, verify)
      .then((result) => {
        setfinal(result);
        alert("code sent");
        setStep(2);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then(({ user }) => {
        user.name = name;
        user.phone = mynumber;
        handleSaveUser(user);
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };

  const renderView = () => {
    switch (step) {
      case 0:
        return (
          <button
            className="w-100 btn btn-outline-info"
            onClick={() => setStep(1)}
          >
            Login in with Phone
          </button>
        );
      case 1:
        return (
          <form onSubmit={signin}>
            <Input
              required
              label="Name"
              value={name}
              setValue={(val) => setName(val)}
            />
            <Input
              value={mynumber}
              setValue={setnumber}
              placeholder="Phone Number"
              required
              name="phone"
            />
            <div id="recaptcha-container"></div>
            <button
              className="btn btn-dark"
              type="submit"
              //   onClick={() => handleSaveUser({ phone: mynumber, name })}
            >
              Send OTP
            </button>
          </form>
        );
      case 2:
        return (
          <div>
            <Input
              type="text"
              placeholder={"Enter your OTP"}
              value={otp}
              setValue={setotp}
            />
            <button
              className="btn btn-outline-success w-100"
              onClick={ValidateOtp}
            >
              Verify
            </button>
          </div>
        );

      default:
        break;
    }
  };

  return <div className="mt-4">{renderView()}</div>;
};

export default PhoneLogin;
