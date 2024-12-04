import { PrismaClient } from '@prisma/client';
import { buildSchema } from 'graphql';

const prisma = new PrismaClient();

const schema = buildSchema(`
  type Owner {
    id: String
    email: String
    givenName: String
    surname: String
  }

  type Query {
    owner: Owner
  }
`);

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  owner() {
    return {
      id: '1',
      surname: 'my name',
      number: 1,
    };
  },
};

export { schema, rootValue };
