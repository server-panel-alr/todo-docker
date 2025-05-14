import bcrypt from 'bcrypt';

const createCredentialService = () => {
  return {
    hash: async (password: string) => {
      return await bcrypt.hash(password, 10);
    },

    compare: async ({
      password,
      passwordHash,
    }: {
      password: string;
      passwordHash: string;
    }) => {
      return await bcrypt.compare(password, passwordHash);
    },
  };
};

/**
 * Credential service for hashing and comparing passwords.
 *
 * @returns credential service api
 */
const Credential = createCredentialService();

export { Credential };
