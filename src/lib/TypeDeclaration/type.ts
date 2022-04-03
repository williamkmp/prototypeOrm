//-----------[TYPE FROM MYSQL2 PACKAGE]-----------
import mysql from "mysql2/promise";
export type Config = mysql.ConnectionOptions;                                       //Database Configuration i.e. host, name, url, user, pass, etc...
export type Connection = mysql.Connection;                                          //Database Connection to do operation and executing query 

//-----------[TYPE FOR PUKIS PACKAGE]-----------
import { TableSchema } from "../table/tableSchema.js";                              //object that hold information for one table (contains many ColumnSchema)
import { BOILERPLATE } from "../schema/schemaBoilerPlate.js";                       //schema.js bolierplate when user run "init" command
import { SchemaManager } from "../schema/schemaManager.js";                         //class for managing client schema
import { ColumnDataType } from "../columns/dataType.js";							//interface for client to choose col data type must return a constraint class
import { NumericConstraint } from "../columns/constraint.js";						//interface for numeric column constraint type
import { StringConstraint } from "../columns/constraint.js";						//interface for string column constraint type
import { DateConstraint } from "../columns/constraint.js";							//interface for date column constraint type
import { ForeignConstraint } from "../columns/constraint.js";						//interface for foreign key column constraint type
import { IdConstraint } from "../columns/constraint.js";							//interface for id column type, alias for BIGINT UNSIGNED UNIQUE NOT NULL
import { MigrationHandler } from "../migrator/migrationHandler.js";					//class that handle schema migration to database


export type UnParsedSchema = config & tables;                                       //unparsed client schema inside client project schema directory  
type config = {[tableName: string]: Array<ColInfoable>;};                          //table definition inisde unparsedClinetSchema
type tables = {DATABASE_CONFIG: mysql.ConnectionOptions;};                          //config object inside unparsedClientSchema
export type ClientSchema = [mysql.ConnectionOptions, Array<TableSchema>];           //parsed client schema, obtained from importig then parsing schema.js using MigrationHandler.ts class 

export interface ColumnInfo {                                                       //object that hold information of one column i.e. name, isPrimary, reference, etc
	name: string | null;                                                            //column anme
	query: string | null;                                                           //sql query for the column in form of string, example "COLNAME INT NOT NULL"
	type: COLTYPE | null;                                                           //column data type in javascript
	isPrimary: boolean;                                                             //is column primary key
	isOptional: boolean | null;                                                     //is column auto incremented 
	isForeign: boolean;                                                             //is column foreign key
	refrenceTabelName: string | null;                                               //refrenced table name if this column is set to be foreign key, null if not 
	referenceColName: string | null;                                                //refrenced column name if this column is set to be foreign key, null if not
}

export interface ColInfoable {                                                      //interface that must be implemented for any column related class
	__columnInfo: ColumnInfo;
}

export enum COLTYPE {                                                               //column data type in javascript
	STRING = "string",
	NUMBER = "number",
	BOOL = "boolean",
}

export type integerSize = "TINY" | "SMALL" | "MED" | "DEF" | "BIG";                 //sql int sizes

export interface Constraintable {													//interface for basic constraint columns
	unique: () => this;
	notNull: () => this;
	primary: () => this;
	references: (tableName: string) => ForeignConstraint;
	default: (value: any) => this;
}

export interface ForkeyConstraintable {												//interface after user choose refrences() in Constraintable
	on: (columnName: string) => ColInfoable;
}

export {ColumnDataType, TableSchema, SchemaManager, BOILERPLATE, NumericConstraint, StringConstraint, DateConstraint, IdConstraint, MigrationHandler};