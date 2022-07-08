import axios from "./customAxios";

export const getCategory = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("AssortmentCategory")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeCategory = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`AssortmentCategory/DeleteCategory/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addCategory = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`AssortmentCategory/CreateCategory`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateCategory = async (id, values) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`AssortmentCategory/UpdateCategory`, { id, ...values })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
