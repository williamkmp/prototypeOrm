import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import {
	ClientSchema,
	ColInfoable,
	TableSchema,
	UnParsedSchema,
	BOILERPLATE as SchemaBoilerPlate,
} from "../TypeDeclaration/type.js";

/**
 * class to manage user schema
 * function:
 * - generate schema
 * - read schema
 * - check schema
 * -
 * @author william
 */
export class SchemaManager {
	private clientSchemaFilePath: string;

	constructor() {
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
		if (!existsSync("schema")) {
			mkdirSync("schema");
		}
		writeFileSync("schema/schema.js", SchemaBoilerPlate);
	}

	/**
	 * try to parse the client schema if there is error
	 * return null
	 * @returns {Promise<ClientSchema | null>} parsed client schema
	 */
	async readSchema(): Promise<ClientSchema | null> {
		let clientSchema: ClientSchema | null;

		try {
			let unparsedSchema = (await import(this.clientSchemaFilePath)) as UnParsedSchema;

			//finding the database config
			let databaseConfig = unparsedSchema?.DATABASE_CONFIG;
			if (!databaseConfig) {
				throw "Database Config not found ";
			}

			//collecting all tableSchema into array of string
			let tableSchemas = [];
			for (let tableName in unparsedSchema) {
				if (Array.isArray(unparsedSchema[tableName])) {
					let tableSchema = new TableSchema(tableName, unparsedSchema[tableName] as Array<ColInfoable>);
					tableSchemas.push(tableSchema);
				}
			}

			clientSchema = [databaseConfig, tableSchemas];
		} catch (error) {
			clientSchema = null;
		}

		return clientSchema;
	}
}
