import mysql from "mysql2/promise";
import { Config, Connection, ClientSchema, TableSchema } from "../TypeDeclaration/type.js";

/**
 * class to manage client schema migration
 * @author william
 */
export class MigrationHandler {
	private databaseConfig: Config;
	private tableSchemas: Array<TableSchema>;
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
	 * get all DROP TABLE queries from the database
	 * @returns {Promise<Array<string>>} drop queries
	 */
	private async getEmptyQueries(): Promise<Array<string>> {
		let queries: Array<string> = [];
		try {
			let database = await this.connect();
			let [rows] = await database.execute("SHOW TABLES;");
			let datas = rows as Array<mysql.RowDataPacket>;
			datas.forEach((row) => {
				for (let header in row) {
					queries.push(`DROP TABLE IF EXISTS \`${row[header]}\`;`);
				}
			});
		} catch (error) {
		} finally {
			return queries;
		}
	}

	/**
	 * ASYNC
	 * migrate parsed client schema to the database
	 * using connection created from DATABSE_CONFIG
	 * @returns { Promise<void> } database connection
	 */
	async migrate(): Promise<void> {
		//TODO: test this function
		let database = await this.connect();
		let createQueries = this.tableSchemas.map((schema) => schema.getCreateQuery());
		let dropQueries = await this.getEmptyQueries();
		await database.execute("SET foreign_key_checks=0;");
		createQueries.forEach(async (query) => {
			await database.execute(query);
		});
		dropQueries.forEach(async (query) => {
			await database.execute(query);
		});
		await database.execute("SET foreign_key_checks=1;");
	}
}
