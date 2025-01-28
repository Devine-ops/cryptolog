import express, { json } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient();

app.use(json());
app.use(cors());

function generateAcountAndAgency(size){
  let number = '';
  for (let i = 0; i < size; i++){
    number += Math.floor(Math.random() * 10);
  }
  return number.toString();
}

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

  const acount = generateAcountAndAgency(4);
  const agency = generateAcountAndAgency(6);
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const formattedDateOfBirth = new Date(dateOfBirth).toISOString();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        dateOfBirth: formattedDateOfBirth,
        nationality,
        phone,
        typeOfDocument,
        documentNumber,
        imgDocument,
        completeAddress,
        postalCode,
        acount,
        agency,
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
