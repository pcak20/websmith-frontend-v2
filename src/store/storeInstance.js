// ================================
// store/storeInstance.js
// ================================
let storeInstance = null;

export const setStore = (store) => {
  storeInstance = store;
};

export const getStore = () => {
  if (!storeInstance) {
    throw new Error("Store has not been initialized");
  }
  return storeInstance;
};
