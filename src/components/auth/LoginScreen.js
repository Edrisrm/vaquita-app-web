import React from "react";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, twoFactor } from "../../actions/authAction";
import { GoogleLogin } from "react-google-login";
import { useForm } from "../../hooks/useForm";

import "../../assets/css/loginScreen.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { id, given_name, two_factors_activated } = useSelector(
    (state) => state.auth
  );

  const [formLoginValues, handleLoginInputChange] = useForm({
    temp_token: "",
  });

  const { temp_token } = formLoginValues;

  const responseSuccessGoogle = (resp) => {
    dispatch(startGoogleLogin(resp));
  };

  const responseErrorGoogle = (resp) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: resp.error,
    });
  };

  const handleTwoFactor = (e) => {
    e.preventDefault();
    dispatch(twoFactor(id, temp_token));
  };

  if (!two_factors_activated && id) {
    return (
      <div className="loginForm">
        <section className="loginSection">
          <div className="form-container">
            <h1 className="loginH1">VAQUITA APP WEB</h1>

            <form onSubmit={handleTwoFactor}>
              <h2 className="loginH1">{`Hola ${given_name}`}</h2>

              <div className="control">
                <label className="label" htmlFor="temp_token">
                  Código de verificación{" "}
                </label>
                <input
                  className="input-field"
                  type="number"
                  name="temp_token"
                  id="temp_token"
                  value={temp_token}
                  onChange={handleLoginInputChange}
                />
              </div>
              <div className="control">
                <input type="submit" value="Verificar" />
              </div>

              <div className="link">
                <a href="localhost/acceso"> Iniciar sesión en otra cuenta </a>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="loginForm">
        <section className="loginSection">
          <div className="form-container">
            <h1 className="loginH1">VAQUITA APP WEB</h1>
            <form>
              <div className="control">
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="google button"
                  />
                </div>

                <GoogleLogin
                  clientId="720440306234-5ia17427jclhgsa6rl76dn9gbf531iuo.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <input
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      type="submit"
                      value="Sesión con Google"
                    />
                  )}
                  buttonText="Login"
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseErrorGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
};
