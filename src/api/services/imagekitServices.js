import imagekit from "../../imagekit.js";

export default function imagekitController(req, res) {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
}
