import {ColInfoable, ColumnDataType} from "../TypeDeclaration/type.js"

/**
 * create column schema that
 * describe a column name, type, constraints
 * for CreateTable
 */
export function col(columnName: string): ColInfoable {
	//TODO: test this function
    let colSchema = new ColumnDataType(columnName);
	return colSchema;
}

