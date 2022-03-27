import { ColInfoable, COLTYPE, ColumnInfo, integerSize, NumericConstraint } from "../TypeDeclaration/type.js";

/**
 * class that initialize the sql column data type
 * for client to choose, returns 
 * ColumnConstraint class 
 */
export class ColumnDataType implements ColInfoable {
	__columnInfo: ColumnInfo;

	constructor(columnName: string) {
		this.__columnInfo = {
			name: columnName,
			query: null,
			type: null,
			isPrimary: false,
			isOptional: null,
			isForeign: false,
			referenceColName: null,
			refrenceTabelName: null
		};
	}

	/**
	 * sql integer data type SMALLINT, TINYINT, MEDIUMINT, BIGINT, INT
	 * @param size : string to determine the sql data type, can be
	 * 				"TINY", "SMALL", "MED", "DEF", "BIG".
	 * 				default to DEF (INT) ;
	 * @param width : width of the int display default to 255
	 */
	integer(size?: integerSize, width?: number) {
		let _width = width || 255;

		//set size to "DEF" if it is not declared
		if (!size) size = "DEF";
		let _size = size;

		//setting the columnInfo
		this.__columnInfo.query = `${this.__columnInfo.name}`;
		this.__columnInfo.type = COLTYPE.NUMBER;

		switch (_size) {
			case "TINY":
				this.__columnInfo.query += ` TINYINT(${_width})`;
				break;
			case "SMALL":
				this.__columnInfo.query += ` SMALLINT(${_width})`;
				break;
			case "MED":
				this.__columnInfo.query += ` MEDIUMINT(${_width})`;
				break;
			case "BIG":
				this.__columnInfo.query += ` BIGINT(${_width})`;
				break;
			default:
				//same as "DEF"
				this.__columnInfo.query += ` INT(${_width})`;
				break;
		}

		return new NumericConstraint(this.__columnInfo);
	}

	//TODO: impelement all sql data types

	/**
	 * sql string data tpe VARCHAR, MEDIUMTEXT, LONGTEXT
	 * @param size : the number of character the string can hold, default to 255
	 * 				minimum of 1 and maximum of 4294967295;
	 */
	string(size?: number) {
		//error guard
		if (!size || size <= 0) size = 255;

		//setting the columnInfo
		this.__columnInfo.query = `${this.__columnInfo.name}`;
		this.__columnInfo.type = COLTYPE.STRING;

		if (0 < size && size <= 65535) {
			this.__columnInfo.query += ` VARCHAR(${size})`;
		} else if (65536 < size && size <= 16777215) {
			this.__columnInfo.query += ` MEDIUMTEXT`;
		} else if (16777216 < size && size <= 4294967295) {
			this.__columnInfo.query += ` LONGTEXT`;
		}

		return this; //TODO return ColumnConstarint if class is finished
	}

	/**
	 * sql DATE column data type
	 * with format "yyyy-mm-dd"
	 */
	date() {
		this.__columnInfo.query = `${this.__columnInfo.name} DATE`;
		this.__columnInfo.type = COLTYPE.STRING;
		return this;
	}

	/**
	 * sql YEAR column data type
	 */
	year() {
		this.__columnInfo.query = `${this.__columnInfo.name} YEAR`;
		this.__columnInfo.type = COLTYPE.NUMBER;
		return this;
	}

	/**
	 * sql TIME column data type
	 * with format "hh:mm:ss"
	 */
	time() {
		this.__columnInfo.query = `${this.__columnInfo.name} TIME`;
		this.__columnInfo.type = COLTYPE.STRING;
		return this;
	}

	/**
	 * sql DATETIME column data type can be used for timestamp
	 * with default format "yyyy-mm-dd hh:mm:ss"
	 */
	dateTime() {
		this.__columnInfo.query = `${this.__columnInfo.name} DATETIME`;
		this.__columnInfo.type = COLTYPE.STRING;
		return this;
	}

	/**
	 * alias for sql BIGINT UNSIGNED NOT NULL UNIQUE PRIMARY
	 */
	id() {
		this.__columnInfo.query = `${this.__columnInfo.name} BIGINT UNSIGNED NOT NULL UNIQUE`;
		this.__columnInfo.type = COLTYPE.NUMBER;
		this.__columnInfo.isPrimary = true;
		this.__columnInfo.isForeign = false;
		return this;
	}
};