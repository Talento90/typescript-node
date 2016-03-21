import "reflect-metadata";
import { Kernel } from "inversify";

const env = process.env.NODE_ENV || "dev";
var kernel = new Kernel();

//Register ioc
require(`./inversify.${env}.config`).default(kernel);

export default kernel;