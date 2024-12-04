import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import { schema, rootValue } from './schemas';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const PORT = 3000;

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.post('/auth', async (req, res) => {
  const owner = await prisma.owner.findFirst({
    where: { id: req.body.number, AND: { email: req.body.email } },
  });

  if (owner) {
    const token = jwt.sign(
      {
        email: owner.email,
        fullName: `${owner.givenName} ${owner.surname}`,
        id: owner.id,
      },
      'secret' /*TODO: use secret from .env*/
    );

    res.json({
      token,
    });
  } else {
    res.status(401).end();
  }

  res.end();
});

app.all('/graphql', createHandler({ schema, rootValue }));

app.listen(PORT, () => console.log('listening on port', PORT));
