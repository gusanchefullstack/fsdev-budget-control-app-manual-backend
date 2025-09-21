import { Prisma, PrismaClient } from "#generated/prisma/index.js";
import { createJWT } from "#v1/middleware/auth.js";
import { ICredentials } from "#v1/models/credentials.js";
import { hashPasswords, comparePasswords } from "#v1/middleware/auth.js";
import { config } from "process";

const prisma = new PrismaClient();

const createUser = async (userData: Prisma.UserCreateInput) => {
  try {
    userData.password = await hashPasswords(userData.password);

    const user = await prisma.user.create({
      data: {
        ...userData,
      },
    });
    const jwtUser = {
      username: user.username,
      password: user.password,
      email: user.email,
    };
    const token = createJWT(jwtUser);
    return { user, token };
  } catch (error) {
    throw error;
  }
};

const loginUser = async (credentials: ICredentials) => {
  const user = await prisma.user.findUnique({
    where: {
      username: credentials.username,
    },
  });
  if (!user || !comparePasswords(credentials.password, user.password)) {
    throw new Error("Invalid user");
  } else {
    const jwtUser = {
      username: user.username,
      password: user.password,
      email: user.email,
    };
    const token = createJWT(jwtUser);
    return token
  }
};

export default {
  createUser,
  loginUser,
};
