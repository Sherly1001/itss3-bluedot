const config = {
  port: process.env.PORT || 3000,
};

export type AppConfig = typeof config;
export default () => config;
