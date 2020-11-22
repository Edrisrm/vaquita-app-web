const baseUrl = process.env.REACT_APP_API_URL;

const fetchConsult = (endpoint, data, method = "GET") => {
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

const uploadImageInventory = (endpoint, file0) => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  return fetch(url, {
    method: "POST",
    body: file0,
    headers: {
      Authorization: token,
    },
  })
};

export { fetchConsult, uploadImageInventory };
