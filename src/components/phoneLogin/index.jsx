import { useEffect, useState } from "react";
import Input from "../Input";

import { Button, Modal } from "react-bootstrap";

import { auth, firebase } from "../../firebaseconfig";
import { useDispatch } from "react-redux";
import { phoneLogin } from "../../redux/auth/actions";

const steps = {
  modal: "modalClose",
  phoneNo: "phoneNo",
  verifyCode: "verifyCode",
};

const PhoneLogin = () => {
  // Inputs
  const [step, setStep] = useState(steps.modal);
  const [mynumber, setnumber] = useState("+923");
  const [otp, setOtp] = useState("");
  const [final, setFinal] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSaveUser = (data) => {
    dispatch(phoneLogin(data));
  };

  useEffect(() => {
    if (step === steps.modal) {
      setLoading(false);
      setName("");
      setnumber("+923");
    }
  }, [step]);

  // Sent OTP
  const handleSignInWithPhone = (e) => {
    e.preventDefault();
    if (mynumber === "" || mynumber.length < 10 || loading) return;
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    setLoading(true);
    auth
      .signInWithPhoneNumber(mynumber, verify)
      .then((result) => {
        setFinal(result);
        alert("code sent");
        setStep(steps.verifyCode);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  // Validate OTP
  const validateOtp = () => {
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
      case steps.phoneNo:
        return (
          <form onSubmit={handleSignInWithPhone}>
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
      case steps.verifyCode:
        return (
          <div>
            <Input
              type="text"
              placeholder={"Enter your OTP"}
              value={otp}
              setValue={setOtp}
            />
            <button
              className="btn btn-outline-success w-100"
              onClick={validateOtp}
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
        onClick={() => setStep(steps.phoneNo)}
        block
      >
        Login with Phone
      </Button>
      <Modal show={step !== steps.modal} onHide={() => setStep(steps.modal)}>
        <Modal.Header closeButton>
          <Modal.Title>Mobile Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderView()}</Modal.Body>
      </Modal>
    </>
  );
};

export default PhoneLogin;
