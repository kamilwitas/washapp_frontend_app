import axios from "./customAxios";

export const getLocations = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`Locations`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCustomerLocations = async (locationId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`Customers/Location/${locationId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateLocations = async (locationId, newData) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`Locations/${locationId}`, newData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeLocation = async (locationId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`Locations/${locationId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
