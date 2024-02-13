import jwt from "jsonwebtoken";

// generating the token
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECREt, {
    expiresIn: "30d",
  });

  //  set the token as JWT HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    // Ensures the cookie is only accessible via HTTP(S) requests, enhancing security by preventing client-side JavaScript access.
    secure: process.env.NODE_ENV !== "development",
    // Limits cookie transmission to HTTPS connections in production to protect against eavesdropping and interception, in development it can be http
    sameStrict: "strict",
    // Specifies that the cookie should only be sent to the same site in a strict and secure manner, mitigating CSRF attacks.
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // Sets the maximum age of the cookie to 30 days, after which it expires and is automatically removed from the client's browser.
  });

  return token;
};

export default generateToken;
