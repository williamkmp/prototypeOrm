import { ColumnSchema } from "../columns/column.js"


/**
 * class to describe a table from client schema
 * contains table name, columnSchemas, tableName
 * and CREATE TABLE query
 */
export class TableSchema{
    name: string;
    primaryColumn: ColumnSchema | null;
    columnsArray: Array<ColumnSchema>; //including the primary key
      
    constructor(name: string, columnSchemas: Array<ColumnSchema>){
        this.name = name;
        this.primaryColumn = null;
        columnSchemas.forEach((columnSchema) => {
            if(columnSchema.__columnInfo.isPrimary){
                this.primaryColumn = columnSchema;
            }
        });
        this.columnsArray = columnSchemas;
    }

    /**
     * create MySQL query for creating the table
     * including the constraint (oncreate constraint)
     * @returns {string} sql query to create table
     */
    getCreateQuery(): string{
		//TODO: implement create query from this.columnsArray
		return "";
	}
}