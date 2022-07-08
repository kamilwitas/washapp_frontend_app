import axios from "./customAxios";

export const getAssortments = async (customerId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`Customers/GetCustomerAssortmentList/${customerId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addAssortments = async (
  data,
  customerId,
  assortmentCategoryId
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`Customers/AddAssortment`, {
        customerId,
        assortmentCategoryId,
        ...data,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteAssortments = async (customerId, assortmentId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`Customers/DeleteAssortment`, {
        data: { customerId, assortmentId },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editAssortments = async (
  customerId,
  assortmentId,
  newCategoryId,
  values
) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`Customers/EditCustomerAssortment/${customerId}`, {
        assortmentId,
        newCategoryId,
        ...values,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
