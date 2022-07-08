import axios from "./customAxios";

export const getLogin = async (userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post("Users/signIn", userData)
      .then((response) => {
        resolve(response.data.accessToken);
        console.log(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUserInfo = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("Users/getAuthUserDetails")
      .then((response) => {
        resolve(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllUser = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("Users/all")
      .then((response) => {
        resolve(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addNewUser = async (userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post("Users/signUp", userData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeUser = async (userGuid) => {
  return new Promise((resolve, reject) => {
    axios
      .delete("Users/remove", { data: { userGuid } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
