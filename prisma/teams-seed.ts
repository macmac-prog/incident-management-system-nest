import { PrismaClient, TeamCategory } from '@prisma/client';

const prisma: any = new PrismaClient();

async function main() {
  await prisma.team.createMany({
    data: [
      {
        name: TeamCategory.HARDWARE_TEAM,
      },
      {
        name: TeamCategory.INFRASTRUCTURE_TEAM,
      },
      {
        name: TeamCategory.NETWORK_TEAM,
      },
      {
        name: TeamCategory.SECURITY_TEAM,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
