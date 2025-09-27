import { PrismaClient, Prisma } from "#generated/prisma/index.js";
import { IAccountUpdate } from "#v1/models/account.js";
import { IJwtUser } from "#v1/models/userJWT.js";

const prisma = new PrismaClient();

const createAccount = async (
  user: IJwtUser,
  data: Prisma.AccountCreateInput
) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const newAccount = await prisma.account.create({
        data: {
          ...data,
          owner: {
            connect: { id: validatedUser.id },
          },
        },
      });
      return newAccount;
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

const getAccounts = async (user: IJwtUser) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const accounts = await prisma.account.findMany({
        where: {
          ownerId: validatedUser.id,
        },
      });
      return accounts;
    }
  } catch (error) {
    throw error;
  }
};

const getSingleAccount = async (user: IJwtUser, accountId: string) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const account = await prisma.account.findUnique({
        where: {
          id: accountId,
          AND: {
            ownerId: validatedUser.id,
          },
        },
      });
      if (account) {
        return account;
      } else {
        throw new Error("Account not found");
      }
    }
  } catch (error) {
    throw error;
  }
};

const updateAccount = async (
  user: IJwtUser,
  accountId: string,
  data: Prisma.AccountUpdateInput
) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const account = await prisma.account.update({
        where: {
          id: accountId,
          AND: { ownerId: validatedUser.id },
        },
        data: {
          ...data,
        },
      });
      return account;
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (user: IJwtUser, accountId: string) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const account = await prisma.account.delete({
        where: {
          id: accountId,
          AND: { ownerId: validatedUser.id },
        },
      });
      return account;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  createAccount,
  getAccounts,
  getSingleAccount,
  updateAccount,
  deleteAccount,
};
