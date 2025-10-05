import { PrismaClient, Prisma } from "#generated/prisma/index.js";
import { IJwtUser } from "#v1/models/userJWT.js";

const prisma = new PrismaClient();

const createBudget = async (
  user: IJwtUser,
  data: Prisma.BudgetCreateInput
) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const newBudget = await prisma.budget.create({
        data: {
          ...data,
          owner: {
            connect: { id: validatedUser.id },
          },
        },
      });
      return newBudget;
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

const getBudgets = async (user: IJwtUser) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const budgets = await prisma.budget.findMany({
        where: {
          ownerId: validatedUser.id,
        },
      });
      return budgets;
    }
  } catch (error) {
    throw error;
  }
};

const getSingleBudget = async (user: IJwtUser, budgetId: string) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const budget = await prisma.budget.findUnique({
        where: {
          id: budgetId,
          AND: {
            ownerId: validatedUser.id,
          },
        },
      });
      if (budget) {
        return budget;
      } else {
        throw new Error("Budget not found");
      }
    }
  } catch (error) {
    throw error;
  }
};

const updateBudget = async (
  user: IJwtUser,
  budgetId: string,
  data: Prisma.BudgetUpdateInput
) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const budget = await prisma.budget.update({
        where: {
          id: budgetId,
          AND: { ownerId: validatedUser.id },
        },
        data: {
          ...data,
        },
      });
      return budget;
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

const deleteBudget = async (user: IJwtUser, budgetId: string) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const budget = await prisma.budget.delete({
        where: {
          id: budgetId,
          AND: { ownerId: validatedUser.id },
        },
      });
      return budget;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  createBudget,
  getBudgets,
  getSingleBudget,
  updateBudget,
  deleteBudget,
};
