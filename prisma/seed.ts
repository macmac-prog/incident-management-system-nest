import { PrismaClient, UserRoles } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma: any = new PrismaClient();

async function main() {
  const samplePassword = 'password';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(samplePassword, salt);

  const adminRole = await prisma.Role.create({
    data: {
      name: UserRoles.ADMIN,
    },
  });

  const technicianRole = await prisma.Role.create({
    data: {
      name: UserRoles.TECHNICIAN,
    },
  });

  const userRole = await prisma.Role.create({
    data: {
      name: UserRoles.USER,
    },
  });

   await prisma.UserLogin.create({
        data: {
        username: 'admin',
        user: {
            create: {
                firstName: 'Admin',
                lastName: 'Istrator',
                email: 'admin@gmail.com',
                address: '123 Main St',
                phoneNumber: '09123456789',
            }
        },
        password: hashedPassword,
        roles: {
            connect: { id: adminRole.id },
        },
        },
    });
   await prisma.UserLogin.create({
        data: {
        username: 'technician',
        user: {
            create: {
                firstName: 'Tech',
                lastName: 'Nichan',
                email: 'technichan@gmail.com',
                address: '123 Main St',
                phoneNumber: '09123456789',
            }
        },
        password: hashedPassword,
        roles: {
            connect: { id: technicianRole.id },
        },
        },
    });
   await prisma.UserLogin.create({
        data: {
        username: 'user',
        user: {
            create: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'user@gmail.com',
                address: '123 Main St',
                phoneNumber: '09123456789',
            }
        },
        password: hashedPassword,
        roles: {
            connect: { id: userRole.id },
        },
        },
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
