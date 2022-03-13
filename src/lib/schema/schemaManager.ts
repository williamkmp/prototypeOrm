import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path" ;
import { BOILERPLATE } from "./schemaBoilerPlate.js";

/**
 * class to manage user schema
 * function:
 * - generate schema
 * - read schema 
 * - chec schema
 * @author william
 */
export class SchemaManager {
    
    /**
     * path to the client schema/scema.js
     * inside the schema folder 
     */
    private clientSchemaPath: string;
    
    constructor(){
        this.clientSchemaPath = "file:///" + join(process.cwd(), "/schema/schema.js");
    }

    /**
     * function to check if client schema.js is initialized
     * @returns {boolean} schema.js exists or not
     */
    exist(): boolean{
        return existsSync(this.clientSchemaPath);
    }

    /**
     * to create schema/schema.js to client project directory
     * if it already exist overwite the content to the
     * boilerplate code
     * @returns {void}
     */
    create(): void{
        if(!existsSync(this.clientSchemaPath)){
            mkdirSync("schema");
            mkdirSync(join(this.clientSchemaPath, "/schema"));
        }
        //TODO
        writeFileSync();
    }

};