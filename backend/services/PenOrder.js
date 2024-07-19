const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPenOrder = async () => {
  return await prisma.pendingOrder.findMany({
    // include: { Order: true, Favorites: true },
  });
};

const createPenOrder = async (data) => {
  try {
    console.log('Creating pendingOrder with data:', data);
    const pendingOrder = await prisma.pendingOrder.create({ data });
    return pendingOrder;
  } catch (error) {
    console.error('Error creating pendingOrder:', error.message);
    throw new Error(`Could not create pendingOrder: ${error.message}`);
  }
};

const updatePenOrder = async (clientId, data) => {
  return await prisma.pendingOrder.updateMany({
    where: { clientId: clientId },
    data,
  });
};

const deletePenOrder = async (id) => {
  try {
    await prisma.pendingOrder.delete({
      where: { idpendingOrders: parseInt(id) },
    });
    return { message: 'pendingOrder deleted successfully' };
  } catch (error) {
    console.error(`Failed to delete pendingOrder with ID ${id}:`, error);
    throw new Error(`Failed to delete pendingOrder with ID ${id}: ${error.message}`);
  }
};

module.exports = {
  deletePenOrder,
  updatePenOrder,
  createPenOrder,
  getPenOrder,
};
