import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const auth = {
  isAuthenticated,
  verifyToken,
};

function isAuthenticated() {
  try {
    const token = verifyToken();

    console.log("token", token);

    return token ? true : false;
  } catch {
    return false;
  }
}

function verifyToken() {
  const token = cookies().get("authorization")?.value ?? "";
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  const id = decoded.sub as string;
  return id;
}