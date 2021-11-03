import React, { useEffect, useState } from "react";
import Input from "../Input";

import { Button, Modal } from "react-bootstrap";

// import { firebase, auth } from "./firebase";
import { auth, firebase } from "../../firebaseconfig";
import { useDispatch } from "react-redux";
import { phoneLogin } from "../../redux/auth/actions";
// import {ForceR}
const PhoneLogin = () => {
  // Inputs
  const [mynumber, setnumber] = useState("+923");
  const [otp, setotp] = useState("");
  const [step, setStep] = useState(0);
  const [final, setfinal] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSaveUser = (data) => {
    dispatch(phoneLogin(data));
  };

  useEffect(() => {
    if (step === 0) {
      setLoading(false);
      setName("");
      setnumber("+923");
    }
  }, [step]);
  // Sent OTP
  const signin = (e) => {
    e.preventDefault();
    if (mynumber === "" || mynumber.length < 10 || loading) return;
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    setLoading(true);
    auth
      .signInWithPhoneNumber(mynumber, verify)
      .then((result) => {
        setfinal(result);
        alert("code sent");
        setStep(2);
      })
      .catch((err) => {
        alert(err);
        // window.location.reload();
        setLoading(false);
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
        setLoading(false);
      })
      .catch((err) => {
        alert("Wrong code");
        setLoading(false);
      });
  };

  const renderView = () => {
    switch (step) {
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
              min={11}
            />
            <div id="recaptcha-container"></div>
            <button className="btn btn-dark" type="submit" disabled={loading}>
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

  return (
    <>
      <Button
        className=" my-2  w-100"
        variant="outline-success"
        onClick={() => setStep(1)}
        block
      >
        Login with Phone
      </Button>
      <Modal show={step !== 0} onHide={() => setStep(0)}>
        <Modal.Header closeButton>
          <Modal.Title>Mobile Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderView()}</Modal.Body>
      </Modal>
    </>
  );
};

export default PhoneLogin;
