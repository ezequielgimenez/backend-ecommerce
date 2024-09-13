import { User, Order } from "connections/sequelize";

User.hasMany(Order);

export async function findOrCreateUser(email) {
  const [user, userCreated] = await User.findOrCreate({
    where: { email },
    defaults: email,
  });
  return user;
}

export async function findOneUserById(id) {
  const user = await User.findByPk(id);
  const data = user.toJSON();
  return data;
}

export async function actualizarDatosUser(dato, id) {
  const user = await User.update(dato, {
    where: {
      id,
    },
  });
  return user;
}

export async function actualizarItemUser(dato, id) {
  const user = await User.update(dato, {
    where: {
      id,
    },
  });
  return user;
}

export { User };
