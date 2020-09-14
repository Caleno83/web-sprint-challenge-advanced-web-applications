import axiosWithAuth from '../../Protected/axiosWithAuth'

export const fetchColors = () => {
  return axiosWithAuth()
    .get("api/colors")
    .then((res) => {
      console.log("This is the fetchColors Response", res);
      return res;
    });
};