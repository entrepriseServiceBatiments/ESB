const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPayment = async (data) => {
  const { clientId, pendingOrderId, amount } = data;
  const pendingOrder = await prisma.pendingOrder.findUnique({
    where: { id: pendingOrderId },
  });
  if (!pendingOrder) throw new Error('Pending Order not found');
  if (pendingOrder.amount !== amount)
    throw new Error('Pending Order not found');
  return await prisma.payment.create({
    data: {
      clientId,
      pendingOrderId,
      amount,
    },
  });
};

const getPayments = async () => {
  return await prisma.payment.findMany();
};

const getPaymentById = async (clientId) => {
  return await prisma.payment.findUnique({
    where: { clientId: parseInt(clientId) },
  });
};

const deletePayment = async (id) => {
  return await prisma.payment.delete({
    where: { id: parseInt(id) },
  });
};
module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  deletePayment,
};
