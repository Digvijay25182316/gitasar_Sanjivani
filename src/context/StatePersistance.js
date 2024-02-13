import toast from "react-hot-toast";

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return { message: "stored" };
  } catch (error) {
    toast.error(error.message);
  }
};

export const getItem = (key) => {
  try {
    const storageItem = localStorage.getItem(key);
    return { [key]: storageItem };
  } catch (error) {
    toast.error(error.message);
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    toast.error(error.message);
  }
};
