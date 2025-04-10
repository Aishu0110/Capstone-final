const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "MacBook Pro M3",
        price: 1999,
        discount: 10,
        category: "MacBook",
        image: "/macbook.jpg",
      },
      {
        name: "iMac 24-inch",
        price: 1499,
        discount: 5,
        category: "iMac",
        image: "/imac.jpg",
      },
      {
        name: "Mac Mini M2",
        price: 699,
        discount: 0,
        category: "Mac Mini",
        image: "/macmini.jpg",
      },
    ],
  });

  console.log("✅ Products seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
