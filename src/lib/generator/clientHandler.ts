import { ClientSchema } from "../TypeDeclaration/type.js";
import {GENERATE,GENERATE_DECALRATION,SINGLETON} from "./generator.js";
import { writeFileSync, mkdirSync, rmSync} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function writeClient(clientSchema: ClientSchema) {
    const [CONFIG, TableSchemas] = clientSchema;
    const FOLDERPATH = join(__dirname, "../../client");
    const CLIENTPATH = join(__dirname, "../../client/index.js");
    const DECLARATIONPATH = join(__dirname, "../../client/index.d.ts");

    //creating or overwriting the client code
    rmSync(FOLDERPATH, { recursive: true, force: true });
	mkdirSync(FOLDERPATH);

    

}
