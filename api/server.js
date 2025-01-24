import express, { json } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(json());
app.use(cors());

// Rota API
app.post('/api/create-user', async (req, res) => {
  const {
    name,
    email,
    password,
    dateOfBirth,
    nationality,
    phone,
    typeOfDocument,
    documentNumber,
    imgDocument,
    completeAddress,
    postalCode,
    state,
    country,
  } = req.body;

  try {
    const formattedDateOfBirth = new Date(dateOfBirth).toISOString();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        dateOfBirth: formattedDateOfBirth,
        nationality,
        phone,
        typeOfDocument,
        documentNumber,
        imgDocument,
        completeAddress,
        postalCode,
        state,
        country,
      },
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
