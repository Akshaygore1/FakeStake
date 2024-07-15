export const useLocalStorage = (key: string) => {
  const setItem = (item: unknown) => {
    window.localStorage.setItem(key, JSON.stringify(item));
  };

  const getItem = () => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  };

  const isKeyExists = () => {
    return window.localStorage.getItem(key) != null ? true : false;
  };

  return { setItem, getItem, isKeyExists };
};
