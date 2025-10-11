import { PrismaClient, Prisma, CategoryType } from "#generated/prisma/index.js";
import { IJwtUser } from "#v1/models/userJWT.js";
import { da } from "date-fns/locale";

const prisma = new PrismaClient();

// Create new Budget
const createBudget = async (user: IJwtUser, data: Prisma.BudgetCreateInput) => {
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

// Get all Budgets associated to userId
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
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

// Get unique Budget associated to userId
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
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

// Update budget associated to userId
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

// Update budget associated to userId
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
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

// Operations for CRUD Budget Categories
const addBudgetCategory = async (
  user: IJwtUser,
  budgetId: string,
  data: Prisma.BudgetCategoryWhereInput
) => {
  try {
    const validatedUser = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const budget = await prisma.budget.findUnique({
        where: {
          id: budgetId,
        },
      });
      if (!budget) {
        throw new Error("Budget nof found");
      }
      if (data.type === "incomes" || data.type === "expenses") {
        const categoryExist = await prisma.budget.findUnique({
          where: {
            id: budgetId,
            [data.type]: {
              some: {
                name: data.name,
              },
            },
          },
        });
        if (categoryExist) {
          throw new Error(
            `Category  ${data.name} already exist in ${data.type}`
          );
        }

        const updatedBudget = await prisma.budget.update({
          where: {
            id: budgetId,
          },
          data: {
            [data.type]: {
              push: {
                ...data,
              },
            },
          },
        });
        return updatedBudget;
      }
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

const updateBudgetCategory = async (
  user: IJwtUser,
  budgetId: string,
  data: Prisma.BudgetCategoryWhereInput
) => {
  try {
    const validatedUser = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const budget = await prisma.budget.findUnique({
        where: {
          id: budgetId,
        },
      });
      if (!budget) {
        throw new Error("Budget nof found");
      }
      if (data.type === "incomes" || data.type === "expenses") {
        const oldName = data.name?.toString().split("||")[0]
        const newName = data.name?.toString().split("||")[1]
        const categoryExist = await prisma.budget.findUnique({
          where: {
            id: budgetId,
            [data.type]: {
              some: {
                name: oldName,
              },
            },
          },
        });
        if (!categoryExist) {
          throw new Error(
            `Category  ${oldName} doesn't exist in ${data.type}`
          );
        }
        const updatedBudget = await prisma.budget.update({
          where: {
            id: budgetId,
          },
          data: {
            [data.type]: {
              updateMany: {
                where: {
                  name: oldName
                },
                data: {
                  name: newName
                }
              }
            }
          }
        });
        return updatedBudget;
      }
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    throw error;
  }
};

const deleteBudgetCategory = async (
  user: IJwtUser,
  budgetId: string,
  data: Prisma.BudgetCategoryUpdateInput
) => {
  try {
    const validatedUser = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      const budget = await prisma.budget.findUnique({
        where: {
          id: budgetId,
        },
      });
      if (!budget) {
        throw new Error("Budget nof found");
      }
      if (data.type === "incomes" || data.type === "expenses") {
        const categoryExist = await prisma.budget.findUnique({
          where: {
            id: budgetId,
            [data.type]: {
              some: {
                name: data.name,
              },
            },
          },
        });
        if (!categoryExist) {
          throw new Error(
            `Category  ${data.name} doesn't exist in ${data.type}`
          );
        }

        const updatedBudget = await prisma.budget.update({
          where: {
            id: budgetId,
          },
          data: {
            [data.type]: {
              deleteMany: {
                where: {
                  name:data.name
                }
              }
            },
          },
        });
        return updatedBudget;
      }
    } else {
      throw new Error("Invalid user");
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
  addBudgetCategory,
  updateBudgetCategory,
  deleteBudgetCategory
};
