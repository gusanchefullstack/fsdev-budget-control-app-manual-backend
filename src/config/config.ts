interface Config {
  port: number;
  nodeEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 9001,
  nodeEnv: process.env.NODE_ENV || "development",
};

export default Config;
