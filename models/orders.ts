import { User, Order } from "connections/sequelize";

Order.belongsTo(User);

export async function createOrder(id, prod) {
  const order = await Order.create({
    userId: id,
    title: prod.name,
    price: prod.precio,
    img: prod.image,
    product_id: prod.objectID,
    status: "pending",
    date: new Date(),
  });
  return order;
}

export async function findAllOrders(userId) {
  const orders = await Order.findAll({
    where: {
      userId,
    },
  });
  return orders;
}

export async function actualizarOrder(id, status, date) {
  const order = await Order.update(
    {
      status,
      date,
    },
    {
      where: {
        id,
      },
    }
  );
  return order;
}

export async function findOneOrderById(id) {
  const order = await Order.findByPk(id);
  return order;
}

export { Order };
