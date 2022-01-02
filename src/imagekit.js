import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const env = process.env;

const imagekit = new ImageKit({
  urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
  publicKey: env.IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
});

export default imagekit;
