import axios from "axios";
const driveUrl =
  "https://script.google.com/macros/s/AKfycbzh0Jz267JZ_HXGatrE-oJj8fwPHqXAn3G_UkVJX8EJj8m7jSStWeTwa9wHXbFTEVx1Lw/exec";

export const getPlans = async () =>
  axios.get(driveUrl, { withCredentials: false }).then((res) => res.data);

export const checkIfAdmin = async (password: string) =>
  axios
    .get(driveUrl + "?type=password&data=" + password, {
      withCredentials: false,
    })
    .then((res) => res.data.data);
