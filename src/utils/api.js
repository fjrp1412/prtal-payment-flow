// In this file will be the simulation for API Call, but instead calling an api, will be save the info in localstorage

const get = () => {
  /*
     This simulate the get request to some api to get all the "dues"
    */
  const data = JSON.parse(window.localStorage.getItem("dues"));
  return data;
};

const post = (data) => {
  /*
    This simulate the post request to some api to modify (this function will work as patch and put too) the list of dues
     */
  window.localStorage.setItem("dues", JSON.stringify(data));
};

export { get, post };
