interface Config {
  port: number;
  nodeEnv: string;
  jwtSecret: string
}

const appConfig: Config = {
  port: Number(process.env.PORT) || 9002,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "BudgetControlAppSecretKey"
};

export default appConfig;
