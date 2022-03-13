import { type } from "os";

export interface ColumnInfo {
	name: string | null;
	query: string | null;
	type: COLTYPE | null;

	isPrimary: boolean;
	isIncremented: boolean;

	isForeign: boolean;
	refrenceTabelName: string | null;
	referenceColName: string | null;
}

export interface ColInfoable {
	__columnInfo: ColumnInfo;
}

/**
 * create column schema that
 * describe a column name, type, constraints
 * for CreateTable
 */
export function col(columnName: string) {
	//TODO: test this function
    let colSchema = new ColumnSchema(columnName);
	return new ColumnSchema(columnName);
}

export class ColumnSchema implements ColInfoable {
	__columnInfo: ColumnInfo;

	constructor(columnName: string) {
		this.__columnInfo = {
			name: columnName,
			query: null,
			type: null,
			isPrimary: false,
			isIncremented: false,
			isForeign: false,
			referenceColName: null,
			refrenceTabelName: null,
		};
	}
}

enum COLTYPE {
    STRING = "string", 
    NUMBER = "number",
    BOOL = "boolean"
}

//TODO: create ColDataType.ts implements ColInfoable class, implement all MySQL type
type integerSize = "TINY" | "SMALL" | "MED" | "DEF" | "BIG";
export class ColumnType implements ColInfoable{
	__columnInfo: ColumnInfo;

    constructor(colInfo: ColumnInfo){
        this.__columnInfo = colInfo;
    }

    integer(size: integerSize, width: number){
        this.__columnInfo.type = COLTYPE.NUMBER;
        //TODO: implement integer method
        return new ColumnConstraint(this.__columnInfo);
    }
    
    //TODO: implement all MySQL data type
}

//TODO: create ColConstraints.ts implements ColInfoable class, implement all MySQL column constraint
export class ColumnConstraint implements ColInfoable {
	__columnInfo: ColumnInfo;

	constructor(colInfo: ColumnInfo) {
		this.__columnInfo = colInfo;
	}

	//TODO: implement all MySQL data type
}
