require("dotenv").config();
const { default: axios } = require("axios");
const getAddressDetails = async (lat, lng) => {
  const resultMap = await axios
    .get(`${process.env.MAP_IR_URL_API}?lat=${lat}&lon=${lng}`, {
      headers: {
        "x-api-key": process.env.MAP_API_KEY,
      },
    })
    .then((res) => res.data);
  return {
    // address: resultMap.address,
    province: resultMap?.province,
    city: resultMap?.city,
    neighborhood: resultMap?.neighbourhood,
  };
};
module.exports = { getAddressDetails };
