export const getEnv = (name: string) => {
  if (!process.env[name]) throw new Error(`.env ${name} is undefined`);
  return process.env[name]!;
};
