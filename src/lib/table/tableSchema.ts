import { ColInfoable, ColumnInfo } from "../TypeDeclaration/type.js";


/**
 * class to describe a table from client schema
 * contains table name, columnSchemas, tableName
 * and CREATE TABLE query
 */
export class TableSchema{
    name: string;
    primaryColumn: ColumnInfo | null;
    columnsArray: Array<ColumnInfo>; //including the primary key
      
    constructor(name: string, columnSchemas: Array<ColInfoable>){
        this.name = name;
        this.primaryColumn = null;
        this.columnsArray = [];

        columnSchemas.forEach((columnSchema) => {
            if(columnSchema.__columnInfo.isPrimary){
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
    getCreateQuery(): string{
		//TODO: implement create query from this.columnsArray
		return "";
	}
}