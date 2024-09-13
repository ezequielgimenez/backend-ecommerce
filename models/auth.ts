import { DataTypes } from "sequelize";
import { sequelize } from "connections/sequelize";

export const Auth = sequelize.define("auth", {
  email: DataTypes.STRING,
  code: DataTypes.STRING,
  expire: DataTypes.DATE,
  userId: DataTypes.INTEGER,
});

export async function findOrCreateAuth(userId, email) {
  const auth = await Auth.findOrCreate({
    where: {
      userId,
    },
    defaults: {
      email,
      userId,
    },
  });
  return auth;
}

export async function updateAuth(code, expire, userId) {
  const auth = await Auth.update(
    {
      code,
      expire,
    },
    {
      where: {
        userId,
      },
    }
  );
  return auth;
}

export async function actualizarAuth(auth, code, expire) {
  await auth.update({
    code,
    expire,
  });
  return auth;
}

export async function findOneAuth(email, code) {
  const auth = await Auth.findOne({
    where: {
      email,
      code,
    },
  });
  return auth;
}
