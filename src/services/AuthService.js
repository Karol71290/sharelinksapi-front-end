const BASE_URL = process.env.REACT_APP_API_URL + "/users";

const singIn = async ({ email, password }) => {
  try {
    let res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let jsonResponse = await res.json();

    if (jsonResponse.status === "ok") {
      localStorage.setItem("token", jsonResponse.data.token);

      return {
        status: jsonResponse.status,
        message: "Login Successful",
        data: jsonResponse.data.user,
      };
    }

    return {
      status: jsonResponse.status,
      message: jsonResponse.message,
      data: null,
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
      data: null,
    };
  }
};
const singUp = async ({ userName, email, password }) => {
  try {
    let data = JSON.stringify({
      email: email,
      password: password,
      userName: userName,
    });

    let res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    let jsonResponse = await res.json();

    console.log(jsonResponse);

    if (jsonResponse.status === "error") {
      return {
        status: jsonResponse.status,
        message: jsonResponse.message,
        data: null,
      };
    }

    localStorage.setItem("token", jsonResponse.data.token);
    return {
      status: jsonResponse.status,
      message: "Login Successful",
      data: jsonResponse.data.user,
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
      data: null,
    };
  }
};

const singOut = () => {
  localStorage.removeItem("token");
};

const currentUser = async () => {
  try {
    let token = localStorage.getItem("token");
    let res = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    let jsonResponse = await res.json();

    if (jsonResponse.status === "ok") {
      // localStorage.setItem("token", jsonResponse.data.token);

      return {
        status: jsonResponse.status,
        message: "Login Successful",
        data: jsonResponse.data.user,
      };
    }

    return {
      status: jsonResponse.status,
      message: jsonResponse.message,
      data: null,
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
      data: null,
    };
  }
};

const updateAvatar = async ({ avatar }) => {
  const formData = new FormData();
  formData.append("avatar", avatar);

  let token = localStorage.getItem("token");

  let res = await fetch(`${BASE_URL}/avatar`, {
    method: "PATCH",
    headers: {
      // "Content-Type": "application/json",
      Authorization: token,
    },
    body: formData,
  });

  let jsonResponse = await res.json();

  return jsonResponse;
};

const changePassword = async ({ oldPass, newPass }) => {
  try {
    let token = localStorage.getItem("token");

    let body = JSON.stringify({
      oldPass,
      newPass,
    });

    let res = await fetch(`${BASE_URL}/password`, {
      method: "PUT",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    let jsonResponse = await res.json();

    return jsonResponse;
  } catch (error) {
    return {
      status: "error",
      message: "Unknown error",
      data: null,
    };
  }
};

const recoverPassword = async ({ email }) => {
  try {
    let body = JSON.stringify({
      email,
    });

    let res = await fetch(`${BASE_URL}/password/recover`, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    let jsonResponse = await res.json();

    return jsonResponse;
  } catch (error) {
    return {
      status: "error",
      message: "Unknown error: " + error,
      data: null,
    };
  }
};

const resetPassword = async ({ code, email, password }) => {
  try {
    let data = JSON.stringify({
      email: email,
      password: password,
      code: code,
    });

    let res = await fetch(`${BASE_URL}/password/recover`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    let jsonResponse = await res.json();

    console.log(jsonResponse);

    if (jsonResponse.status === "error") {
      return {
        status: jsonResponse.status,
        message: jsonResponse.message,
        data: null,
      };
    }

    return {
      status: jsonResponse.status,
      message: "Recover Successful",
      data: jsonResponse.data.user,
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
      data: null,
    };
  }
};

const updateProfile = async ({ userName, email }) => {
  try {
    let token = localStorage.getItem("token");

    let body = JSON.stringify({
      userName,
      email,
    });

    let res = await fetch(`${BASE_URL}/update-profile`, {
      method: "PUT",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    let jsonResponse = await res.json();

    return jsonResponse;
  } catch (error) {
    return {
      status: "error",
      message: "Unknown error",
      data: null,
    };
  }
};

export {
  singIn,
  singUp,
  singOut,
  currentUser,
  updateAvatar,
  changePassword,
  recoverPassword,
  resetPassword,
  updateProfile
};
