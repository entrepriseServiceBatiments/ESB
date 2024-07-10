const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const workerCategories = [
  "Plumber",
  "Electrician",
  "Housekeeper",
  "Mason",
  "HVAC Technician",
  "Handyman",
  "Appliance Repair Technician",
  "Painter",
  "Gardener",
];

const productCategories = [
  "Plumbing",
  "Electricity",
  "Housekeeping",
  "Windows and blinds",
  "Air conditioning",
  "DIY and assembly",
  "Washing machine",
  "Painting",
  "Gardening",
];

async function main() {
  for (let i = 0; i < 100; i++) {
    await prisma.client.create({
      data: {
        userName: faker.internet.userName(),
        creditCard: faker.finance.creditCardNumber(),
        address: faker.location.streetAddress(),
        cin: faker.number.int({ min: 100000, max: 999999 }),
        phoneNum: parseInt(faker.phone.number("########").replace(/\D/g, "")),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.image.avatar(),
      },
    });
  }

  for (let i = 0; i < 100; i++) {
    await prisma.worker.create({
      data: {
        cin: faker.number.int({ min: 100000, max: 999999 }),
        creditCard: faker.finance.creditCardNumber(),
        userName: faker.internet.userName(),
        phoneNum: parseInt(faker.phone.number("########").replace(/\D/g, "")),
        email: faker.internet.email(),
        password: faker.internet.password(),
        rentedProd: faker.random.words(),
        picture: faker.image.avatar(),
        rating: faker.number.int({ min: 1, max: 5 }),
        jobTitle:
          workerCategories[
            faker.number.int({ min: 0, max: workerCategories.length - 1 })
          ],
        hourlyRate: faker.number.float({ min: 10, max: 100, precision: 0.01 }),
        available: faker.datatype.boolean(),
        address: faker.location.streetAddress(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        status: faker.datatype.boolean(),
        comments: faker.lorem.sentence(),
      },
    });
  }

  for (let i = 0; i < 100; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        category:
          productCategories[
            faker.number.int({ min: 0, max: productCategories.length - 1 })
          ],
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price()),
        picture: faker.image.imageUrl(),
        rating: faker.number.int({ min: 1, max: 5 }),
        stock: faker.number.int({ min: 1, max: 100 }),
        numOfRatings: faker.number.int({ min: 1, max: 1000 }),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
