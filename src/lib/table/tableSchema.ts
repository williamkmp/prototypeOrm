import { ColInfoable, ColumnInfo } from "../TypeDeclaration/type.js";

/**
 * class to describe a table from client schema
 * contains table name, columnSchemas, tableName
 * and CREATE TABLE query
 */
export class TableSchema {
	name: string;
	primaryColumn: ColumnInfo | null;
	columnsArray: Array<ColumnInfo>; //including the primary key
	query: string;

	constructor(name: string, columnSchemas: Array<ColInfoable>) {
		this.name = name;
		this.primaryColumn = null;
		this.columnsArray = [];
		this.query = "";

		columnSchemas.forEach((columnSchema) => {
			if (columnSchema.__columnInfo.isPrimary) {
				this.primaryColumn = columnSchema.__columnInfo;
			}
			this.columnsArray.push(columnSchema.__columnInfo);
		});
	}

	/**
	 * create MySQL query for creating the table
	 * including the constraint (oncreate constraint)
	 * @returns {string} sql query to create table
	 */
	generateQuery() {
		let query = `CREATE TABLE \`${this.name}\`(`;

		let columnQuery: Array<string> = [];
		this.columnsArray.forEach((column) => {
			if (column.query) columnQuery.push(column.query);

			if (column.isPrimary) {
				columnQuery.push(`PRIMARY KEY (\`${column.name}\`)`);
			} else if (column.isForeign) {
				columnQuery.push(
					`FOREIGN KEY (\`${column.name}\`) REFERENCES \`${column.refrenceTabelName}\`(\`${column.referenceColName}\`)`,
				);
			}
		});

        query += columnQuery.join(", ");
		query += ");";
		this.query = query;
		return this.query;
	}
}
