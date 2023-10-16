const BASE_URL = process.env.REACT_APP_API_URL + "/links";

const register = async ({ title, url, description }) => {
  try {
    let data = JSON.stringify({
      title: title,
      url: url,
      description: description,
    });

    let token = localStorage.getItem("token");

    let res = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    let jsonResponse = await res.json();

    if (jsonResponse.status === "error") {
      return jsonResponse;
    }

    return jsonResponse;
  } catch (error) {
    return {
      status: "error",
      message: "Unknown error",
      data: null,
    };
  }
};

const list = async () => {
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

    if (jsonResponse.status === "error") {
      return jsonResponse;
    }

    console.log(jsonResponse);

    return  jsonResponse;

  } catch (error) {
    return {
      status: "error",
      message: error,
      data: null,
    };
  }
};

const votes = async ({ linkId, value }) => {
  try {
    let token = localStorage.getItem("token");

    let res = await fetch(`${BASE_URL}/${linkId}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ value: value }),
    });

    let jsonResponse = await res.json();

    console.log(jsonResponse);

    if (jsonResponse.status === "error") {
      return {
        ...jsonResponse,
        data: null,
      };
    }

    return jsonResponse;
  } catch (error) {
    return {
      status: "error",
      message: "Unknown error",
      data: null,
    };
  }
};

const deleteLink = async (linkId) => {
  try {
    let token = localStorage.getItem("token");

    let res = await fetch(`${BASE_URL}/${linkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    let jsonResponse = await res.json();

    console.log(jsonResponse);

    if (jsonResponse.status === "error") {
      return {
        ...jsonResponse,
        data: null,
      };
    }

    return jsonResponse;
  } catch (error) {
    return {
      status: "error",
      message: "Unknown error",
      data: null,
    };
  }
};

const searchLinks =  async ({keyword}) => {
  
  try {
    let token = localStorage.getItem("token");

    let res = await fetch(`${BASE_URL}?keyword=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    let jsonResponse = await res.json();

    if (jsonResponse.status === "error") {
      return jsonResponse;
    }

    console.log(jsonResponse);

    return  jsonResponse;

  } catch (error) {
    return {
      status: "error",
      message: error,
      data: null,
    };
  }


}

export { register, list, votes, deleteLink, searchLinks };
