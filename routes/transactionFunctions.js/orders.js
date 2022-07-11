const CreateOrders = require("../../model/Orders");

const createOrder = async (fromId, toId, organizationId, amt) => {
  try {
    const currentTime = Date.now();
    const orderId = generateOrderId(organizationId);
    const docs = await CreateOrders(organizationId).create({
      orderId: generateOrderId(organizationId),
      initiatorId: fromId,
      acknowledgerId: toId,
      associatedAmount: amt,
      creationTime: currentTime,
    });
    return docs.orderId;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const updateOrder = async (
  orderId,
  transactionId,
  type,
  status,
  organizationID
) => {
  const currentTime = Date.now();
  const attempt = {
    type: `${type}`,
    timerLog: currentTime,
    transactionId: `${transactionId}`,
    status: status,
  };
  console.log(attempt);
  const orders = await CreateOrders(organizationID).updateOne(
    { orderId: orderId },
    { $push: { attempts: attempt } }
  );
  console.log(orders);
};
const generateOrderId = (organizationId) => {
  const current = Date.now();
  const orderNumber = Math.floor(
    100000000 * (current / 100000000 - Math.floor(current / 100000000))
  );
  const orderId = `${organizationId}000${orderNumber}`;
  return orderId;
};
module.exports = { createOrder, updateOrder };
