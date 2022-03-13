import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path" ;
import { BOILERPLATE as SchemaBoilerPlate } from "./schemaBoilerPlate.js";

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
	private clientSchemaFolderPath: string;
	private clientSchemaFilePath: string;

	constructor() {
		this.clientSchemaFolderPath = "file:///" + join(process.cwd(), "/schema");
        this.clientSchemaFilePath = "file:///" + join(process.cwd(), "/schema/schema.js");
	}

	/**
	 * check if client schema.js is initialized
	 * inside the client directory or not
	 * @returns {boolean} schema.js exists or not
	 */
	exist(): boolean {
		return existsSync(this.clientSchemaFilePath);
	}

	/**
	 * create schema/schema.js to client project directory
	 * if it already exist overwite the content to the
	 * boilerplate code
	 * @returns {void}
	 */
	create(): void {
		if (!existsSync(this.clientSchemaFolderPath)) {
			mkdirSync("schema");
		}
		writeFileSync("schema/schema.js", SchemaBoilerPlate);
	}

	/**
	 * Read the client schema if exist
	 * return null if schema/scahema.js not exist
	 */
	async read(): Promise<Object> {
		let clientSchema;
		try {
			clientSchema = await import(this.clientSchemaFilePath);
		} catch (error) {
			clientSchema = null;
		}
		return clientSchema;
	}
};