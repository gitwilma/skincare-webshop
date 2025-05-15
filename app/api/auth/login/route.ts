// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@prisma/client";
import { serialize } from 'cookie';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const cookie = serialize('authToken', String(user.id), {
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ id: user.id, email: user.email });
}
