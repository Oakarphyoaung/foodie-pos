interface Config {
  jwtScret: string;
}
export const config: Config = {
  jwtScret: process.env.JWT_SECRET || "",
};
