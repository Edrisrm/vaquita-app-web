const baseUrl = process.env.REACT_APP_API_URL;

const signup = (endpoint, idToken, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(idToken),
    });
  }
};

const totp_validate = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

const getUser = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        Authorization: token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
  }
};

const logoutSession = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        Authorization: token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
  }
};

export { signup, totp_validate, getUser, logoutSession };
