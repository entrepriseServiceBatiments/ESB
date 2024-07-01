const bcrypt = require("bcrypt");
// const prisma = require('../prisma');
const prisma = require('./prisma')
const createAdmin = async () => {
  const email = "admin@admin.com";
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log("Admin created successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();
