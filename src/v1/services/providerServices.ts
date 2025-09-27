import { PrismaClient, Prisma } from "#generated/prisma/index.js";
import { IJwtUser } from "#v1/models/userJWT.js";

const prisma = new PrismaClient();

const createProvider = async (
  user: IJwtUser,
  data: Prisma.ProviderCreateInput
) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const newProvider = await prisma.provider.create({
        data: {
          ...data,
          user: {
            connect: { id: validatedUser.id },
          },
        },
      });
      return newProvider;
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

const getProviders = async (user: IJwtUser) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const providers = await prisma.provider.findMany({
        where: {
          userId: validatedUser.id,
        },
      });
      return providers;
    }
  } catch (error) {
    throw error;
  }
};

const getSingleProvider = async (user: IJwtUser, providerId: string) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const provider = await prisma.provider.findUnique({
        where: {
          id: providerId,
          AND: {
            userId: validatedUser.id,
          },
        },
      });
      if (provider) {
        return provider;
      } else {
        throw new Error("Provider not found");
      }
    }
  } catch (error) {
    throw error;
  }
};

const updateProvider = async (
  user: IJwtUser,
  providerId: string,
  data: Prisma.ProviderUpdateInput
) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const provider = await prisma.provider.update({
        where: {
          id: providerId,
          AND: { userId: validatedUser.id },
        },
        data: {
          ...data,
        },
      });
      return provider;
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

const deleteProvider = async (user: IJwtUser, providerId: string) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const provider = await prisma.provider.delete({
        where: {
          id: providerId,
          AND: { userId: validatedUser.id },
        },
      });
      return provider;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  createProvider,
  getProviders,
  getSingleProvider,
  updateProvider,
  deleteProvider,
};
