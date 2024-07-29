import jwt from "jsonwebtoken";
import { db } from "./db";

export async function verifyUser(token) {
  try {
    console.log(token);

    const decoded = jwt.verify(token, "koding24");

    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    console.log(user);

    if (!user || user.role !== "ADMIN") {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
