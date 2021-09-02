import dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/../.env`
});

export const baseUrl = process.env.REACT_APP_URL_BACK;