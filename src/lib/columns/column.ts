import {ColumnInfo, ColumnDataType} from "../TypeDeclaration/type.js"

/**
 * create column schema that
 * describe a column name, type, constraints
 * for CreateTable
 * 
 * @author william
 */
export function col(columnName: string): ColumnDataType {
	//TODO: test this function
	let schema: ColumnInfo = {
		name: columnName,
		query: null,
		type: null,
		isPrimary: false,
		isOptional: null,
		isForeign: false,
		refrenceTabelName: null,
		referenceColName: null
	} 
    let colSchema = new ColumnDataType(schema);
	return colSchema;
}

