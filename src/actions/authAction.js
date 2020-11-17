import Swal from "sweetalert2";
import { types } from "../types/types";
import { fetchConsult } from "../helpers/fetchService";

export const startGoogleLogin = (respGoogleLogin) => {
  return async (dispatch) => {
    const idToken = respGoogleLogin.tokenId;

    const resp = await fetchConsult("auth", { idToken: idToken }, "POST");
    const body = await resp.json();

    if (body.status === "success") {
      dispatch(
        getIdentity({
          id: body.user.id,
          given_name: body.user.given_name,
          two_factors_activated: body.user.two_factors_activated,
        })
      );

      if (body.secret_key) {
        const secret_key =
          "text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify({ secret_key: body.secret_key }));

        Swal.fire({
          icon: "warning",
          title: body.msg,
          text: body.secret_key,
          html:
            "<b>Esta plataforma utiliza seguridad doble paso</b><br/><br/> Tu llave secreta es: " +
            `<hr/> <b>${body.secret_key}</b><hr/><br/>Descarga  <b>Google Authenticator</b>, desde ` +
            '<a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US" target="_blank">este link</a> ' +
            "<br/><br/> Siga las instrucciones de la app para su correcta configuracion" +
            "<br/><br/><b>Por favor matentener la key en un lugar seguro</b> ",
          footer: `<a  href="data:'${secret_key}'" download="secret_key.json">Descargar tu llave secreta?</a>`,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: body.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const twoFactor = (id, temp_token) => {
  return async (dispatch) => {
    const resp = await fetchConsult(
      "auth/totp-validate",
      { id: id, temp_token: temp_token },
      "POST"
    );

    const body = await resp.json();

    if (body.status === "success") {
      localStorage.setItem("identity", JSON.stringify(body.user));
      localStorage.setItem("token", JSON.stringify(body.token));
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        login({
          id: body.user.id,
          given_name: body.user.given_name,
          two_factors_activated: body.user.two_factors_activated,
          role: body.user.role,
        })
      );

      dispatch(TwoFactorValidate());

      Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire("Error", body.msg, "info");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConsult("auth/get-user");
    const body = await resp.json();

    if (body.status === "success") {
      localStorage.setItem("identity", JSON.stringify(body.user));
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          id: body.user.id,
          given_name: body.user.given_name,
          two_factors_activated: body.user.two_factors_activated,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    const resp = await fetchConsult("auth/logout");
    const body = await resp.json();

    localStorage.clear();

    if (body.status === "success") {
      dispatch(logout());

      Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

const checkingFinish = () => ({ type: types.CHECK_LOGIN_FINISH });

const login = (user) => ({
  type: types.LOGIN,
  payload: user,
});

const getIdentity = (user) => ({
  type: types.GET_GOOGLE_IDENTITY,
  payload: user,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const TwoFactorValidate = () => ({
  type: types.TWO_FACTOR_VALIDATE,
});
