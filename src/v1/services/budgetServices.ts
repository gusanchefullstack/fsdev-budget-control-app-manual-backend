import { PrismaClient, Prisma, CategoryType } from "#generated/prisma/index.js";
import { IJwtUser } from "#v1/models/userJWT.js";
import { da } from "date-fns/locale";

const prisma = new PrismaClient();


// BUDGET CRUD
// Create new Budget
const createBudget = async (user: IJwtUser, budgetData: Prisma.BudgetCreateInput) => {
  try {
    const validatedUser = await prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });
    if (validatedUser) {
      if(budgetData.startDate > budgetData.endDate){
        throw new Error("Budget start date cannot be greater than end date")
      }
      const newBudget = await prisma.budget.create({
        data: {
          ...budgetData,
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
  budgetData: Prisma.BudgetUpdateInput
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
          ...budgetData,
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
  categoryData: Prisma.BudgetCategoryWhereInput
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
      if (categoryData.type === "incomes" || categoryData.type === "expenses") {
        const categoryExist = await prisma.budget.findUnique({
          where: {
            id: budgetId,
            [categoryData.type]: {
              some: {
                name: categoryData.name,
              },
            },
          },
        });
        if (categoryExist) {
          throw new Error(
            `Category  ${categoryData.name} already exist in ${categoryData.type}`
          );
        }

        const updatedBudget = await prisma.budget.update({
          where: {
            id: budgetId,
          },
          data: {
            [categoryData.type]: {
              push: {
                ...categoryData,
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
