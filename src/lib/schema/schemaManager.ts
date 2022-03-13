import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { ConnectionOptions } from "mysql2/promise";
import { BOILERPLATE as SchemaBoilerPlate } from "./schemaBoilerPlate.js";
import { ColumnSchema } from "../columns/column.js"
import { TableSchema } from "../table/tableSchema.js"

type config = {
	[tableName: string]: Array<ColumnSchema>;
};
type tables = {
	DATABASE_CONFIG: ConnectionOptions;
};
export type UnParsedSchema = config & tables;
export type ClientSchema = [ConnectionOptions, Array<TableSchema>];

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
	 * try to parse the client schema
	 * @returns {Promise<ClientSchema | null>} parsed client schema
	 */
	async readSchema(): Promise<ClientSchema | null> {
		let schema: UnParsedSchema | null;
		let clientSchema: ClientSchema | null;

		//reading schema
		try {
			schema = (await import(this.clientSchemaFilePath)) as UnParsedSchema;
		} catch (error) {
			return null;
		}

		//parsing
		let databaseConfig = schema?.DATABASE_CONFIG;
		let tableSchemas = [];

		for (let tableName in schema) {
			if (Array.isArray(schema[tableName])) {
				let tableSchema = new TableSchema(tableName, schema[tableName] as Array<ColumnSchema>)
				tableSchemas.push(tableSchema);
			}
		}

		if (databaseConfig) {
			clientSchema = [databaseConfig, tableSchemas];
		} else {
			clientSchema = null;
		}

		return clientSchema;
	}
}
