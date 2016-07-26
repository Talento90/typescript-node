import * as NConf from "nconf";

//Read Configurations
const configs = NConf
                    .argv()
                    .env()
                    .file({ file: `configurations/config.${process.env.NODE_ENV || "dev"}.json` });


export function get(config: string): string {
    return configs.get(config);
}