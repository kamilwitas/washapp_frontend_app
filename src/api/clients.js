import axios from "./customAxios";

export const addCustomer = async (values) => {
  return new Promise((resolve, reject) => {
    axios
      .post("Customers/CreateCustomer", values)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeCustomer = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`Customers/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCustomers = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`Customers`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editCustomers = async (id, newData) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`Customers/EditCustomer/${id}`, newData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
