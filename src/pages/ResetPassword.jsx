import { useState } from "react";
import Button from "../components/Button";
import ErrorMsg from "../components/ErrorMsg";
import FormInput from "../components/FormInput";
import { usePasswordReset } from "../hooks/usePasswordReset";
import SuccessMsg from "../components/SuccessMsg";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { useChangePassword } from "../hooks/useChangePassword";

function ResetPassword() {
  const [session, setSession] = useState("request-otp");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const {
    isLoading: passwordResetIsLoading,
    resetPassword,
    error: passwordResetError,
    setError: setPasswordResetError,
    msg,
  } = usePasswordReset();
  const {
    verifyOtp,
    error: verifyError,
    setError: setVerifyError,
    isLoading: verifyIsLoading,
  } = useVerifyOtp();
  const {
    isLoading: changePasswordIsLoading,
    changePassword,
    error: changePasswordError,
    setError: setChangePasswordError,
  } = useChangePassword();

  const isLoading =
    passwordResetIsLoading || verifyIsLoading || changePasswordIsLoading;

  const error = passwordResetError || verifyError || changePasswordError;

  const setError = (errorMessage) => {
    passwordResetError && setPasswordResetError(errorMessage);
    verifyError && setVerifyError(errorMessage);
    changePasswordError && setChangePasswordError(errorMessage);
  };

  async function handlePasswordReset(e) {
    e.preventDefault();
    if (!username) return setError("Please enter your username");
    const res = await resetPassword(username);
    if (res) setSession("verify-otp");
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    if (!otp) return setError("Please Enter OTP");
    const res = await verifyOtp(otp);

    if (res) setSession("change-password");
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    if (!password.newPassword || !password.confirmPassword)
      return setChangePasswordError("Please Enter Password");
    await changePassword(password.newPassword, password.confirmPassword);
  }

  function handlePasswordOnChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  return (
    <section className="section">
      <div className="form-container">
        {session === "request-otp" && (
          <div className="text-container">
            <h3>Reset Password</h3>
            <p>Enter Email or Username to find your MernAuth Account</p>

            <form action="" className="form" onSubmit={handlePasswordReset}>
              {error && <ErrorMsg error={error} />}
              {msg && <SuccessMsg msg={msg} />}
              <FormInput
                name="passwordreset"
                placeholder="Enter email or username"
                label="Email or Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button disabled={passwordResetIsLoading} type="submit">
                Send OTP
              </Button>
            </form>
          </div>
        )}

        {session === "verify-otp" && (
          <div className="text-container">
            <h3>Verify OTP</h3>
            <p>We have send otp to your email</p>

            <form action="" className="form" onSubmit={handleVerifyOtp}>
              {verifyError && <ErrorMsg error={verifyError} />}
              <FormInput
                name="verifyotp"
                placeholder="Enter OTP"
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
              <Button disabled={isLoading} type="submit">
                Verify OTP
              </Button>
              <Button disabled={isLoading} type="button">
                Back
              </Button>
            </form>
          </div>
        )}

        {session === "change-password" && (
          <div className="text-container">
            <h3>Change Password</h3>
            <p>Please Change your password to new password</p>
            <form className="form" onSubmit={handleChangePassword}>
              {changePasswordError && <ErrorMsg error={changePasswordError} />}
              <FormInput
                type="text"
                name="newPassword"
                label="Password"
                placeholder="Enter Password"
                value={password.newPassword}
                onChange={handlePasswordOnChange}
              />

              <FormInput
                type="text"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                value={password.confirmPassword}
                onChange={handlePasswordOnChange}
              />
              <Button disabled={changePasswordIsLoading} type="submit">
                Change Password
              </Button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default ResetPassword;
