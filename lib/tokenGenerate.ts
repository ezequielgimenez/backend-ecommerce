import jwt from "jsonwebtoken";

export function generateToken(obj) {
  const token = jwt.sign(obj, process.env.JWT_KEY);
  return token;
}

export function decodificarToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded) {
      const jsonString = JSON.stringify(decoded);
      const data = JSON.parse(jsonString);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("error en el token", error);
  }
}
