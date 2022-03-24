import { ColInfoable, COLTYPE, ColumnInfo, integerSize } from "../TypeDeclaration/type.js";

/**
 * class that initialize the sql column data type
 * for client to choose, returns 
 * ColumnConstraint class 
 */
export class ColumnDataType implements ColInfoable{
    __columnInfo: ColumnInfo;

    constructor(columnName : string){
        this.__columnInfo = {
			name: columnName,
			query: null,
			type: null,
			isPrimary: false,
			isIncremented: false,
			isForeign: false,
			referenceColName: null,
			refrenceTabelName: null,
			hasDefault: false,
		};
    }

    integer(size: integerSize, width?: number){
        let _width = width || 255;
    }

    //TODO: impelement all sql data types
};