import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar um novo usuário
  const newUser = await prisma.user.create({
    data: {
      name: 'Vinicius',
      email: 'vinicius@example.com',
      phone: 619988678,
      cpf: 1482314239,
      age: 18,
      cep: 10909800,
      address: 'rua 10 chacara 135'
    },
  });
  console.log('Usuário criado:', newUser);

  // Buscar todos os usuários
  const allUsers = await prisma.user.findMany();
  console.log('Todos os usuários:', allUsers);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
