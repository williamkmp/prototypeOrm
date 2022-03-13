import mysql from "mysql2/promise";
import { ClientSchema  } from "../schema/schemaManager.js";

export type Config = mysql.ConnectionOptions;
export type Connection = mysql.Connection;

/**
 * class to manage client schema migration
 */
export class MigrationHandler {
	private databaseConfig: Config;
	private tableSchemas: any[];
	private database: Connection | null;

	constructor(client: ClientSchema) {
		let [configFile, tableSchemaArray] = client;
		this.databaseConfig = configFile;
		this.tableSchemas = tableSchemaArray;
		this.database = null;
	}

	/**
	 * create database connection based on
	 * database config. If connection is made
	 * return back existing connection
	 * @returns {Connection} database connection
	 */
	private async connect(): Promise<Connection> {
		if (!this.database) {
			this.database = await mysql.createConnection(this.databaseConfig);
		}
		return this.database;
	}

	/**
     * ASYNC
     * migrate parsed client schema to the database
     * using connection created from DATABSE_CONFIG
	 * @returns { Promise<void> } database connection
	 */
	async migrate(): Promise<void> {
        this.tableSchemas;
        //TODO: implement migration
    }
}
