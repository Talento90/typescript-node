import * as Hapi from "hapi";
import Routes from "./routes";

export function init(server: Hapi.Server) {
    Routes(server);
}