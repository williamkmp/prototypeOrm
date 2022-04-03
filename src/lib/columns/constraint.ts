import { ColInfoable, ColumnInfo, Constraintable, ForkeyConstraintable } from "../TypeDeclaration/type.js";
/**
 * constraint class if client choose numeric column type
 * @author william
 */
export class NumericConstraint implements ColInfoable, Constraintable {
	__columnInfo: ColumnInfo;

	constructor(previousColInfo: ColumnInfo) {
		this.__columnInfo = previousColInfo;
	}

	/**
	 * sql PRIMARY constraint, a table can only have one
	 */
	primary() {
		this.__columnInfo.isPrimary = true;
		if (this.__columnInfo.isOptional === null) this.__columnInfo.isOptional = false;
		return this;
	}

	/**
	 * create a foreign key relationship to an existing table
	 *  table can have multiple or no foreign key.
	 * @param tableName refrenced table name
	 */
	references(tableName: string) {
		this.__columnInfo.isForeign = true;
		this.__columnInfo.refrenceTabelName = tableName;
		return new ForeignConstraint(this);
	}

	/**
	 * make a row value unique, if inserted value
	 * exists it will throw an error
	 */
	unique() {
		if (!this.__columnInfo.query?.includes("UNIQUE")) {
			this.__columnInfo.query += " UNIQUE";
		}
		return this;
	}

	/**
	 * make this column cannot be null and must be filled on insert
	 * unless this column is auto incremented or have default a value
	 */
	notNull() {
		if (!this.__columnInfo.query?.includes("NOT NULL")) {
			this.__columnInfo.query += " NOT NULL";
			if (this.__columnInfo.isOptional === null) this.__columnInfo.isOptional = false;
		}
		return this;
	}

	/**
	 * set a number default value if the column value is not defined on insert
	 * @param value default value if it wasnt inserted
	 */
	default(value: number) {
		if (!this.__columnInfo.query?.includes(`DEFAULT ${value}`)) {
			this.__columnInfo.isOptional = true;
			this.__columnInfo.query += `DEFAULT ${value}`;
		}
		return this;
	}

	/**
	 * make this column can only hold positive numbers
	 */
	unsigned() {
		if (this.__columnInfo.query?.includes("UNIQUE")) {
			this.__columnInfo.query += " UNSIGNED";
		}
		return this;
	}

	/**
	 * make this column number auto incremented on insert,
	 * this column cannot be defined on insert
	 */
	incremented() {
		if (this.__columnInfo.query?.includes("UNIQUE")) {
			this.__columnInfo.query += " AUTO_INCREMENT";
		} else {
			this.__columnInfo.query += "UNIQUE AUTO_INCREMENT";
		}
		return this;
	}
}

/**
 * returned constraint class if user choose string columnt type
 * @author william
 */
export class StringConstraint implements ColInfoable, Constraintable {
	__columnInfo: ColumnInfo;

	constructor(previousColInfo: ColumnInfo) {
		this.__columnInfo = previousColInfo;
	}

	/**
	 * sql PRIMARY constraint, a table can only have one
	 */
	primary() {
		this.__columnInfo.isPrimary = true;
		if (this.__columnInfo.isOptional === null) this.__columnInfo.isOptional = false;
		return this;
	}

	/**
	 * create a foreign key relationship to an existing table
	 *  table can have multiple or no foreign key.
	 * @param tableName refrenced table name
	 */
	references(tableName: string) {
		this.__columnInfo.isForeign = true;
		this.__columnInfo.refrenceTabelName = tableName;
		return new ForeignConstraint(this);
	}

	/**
	 * make a row value unique, if inserted value
	 * exists it will throw an error
	 */
	unique() {
		if (!this.__columnInfo.query?.includes("UNIQUE")) {
			this.__columnInfo.query += " UNIQUE";
		}
		return this;
	}

	/**
	 * make this column cannot be null and must be filled on insert
	 * unless this column is auto incremented or have default a value
	 */
	notNull() {
		if (!this.__columnInfo.query?.includes("NOT NULL")) {
			this.__columnInfo.query += " NOT NULL";
			if (this.__columnInfo.isOptional === null) this.__columnInfo.isOptional = false;
		}
		return this;
	}

	/**
	 * set a string default value if the column value is not defined on insert
	 * @param value default value if it wasnt inserted
	 */
	default(value: string) {
		if (!this.__columnInfo.query?.includes(`DEFAULT ${value}`)) {
			this.__columnInfo.isOptional = true;
			this.__columnInfo.query += ` DEFAULT ${value}`;
		}
		return this;
	}
}

/**
 * returned constraint class if user choose date column type
 * @author william
 */
export class DateConstraint implements Constraintable, ColInfoable {
	__columnInfo: ColumnInfo;

	constructor(previousColInfo: ColumnInfo) {
		this.__columnInfo = previousColInfo;
	}

	/**
	 * sql PRIMARY constraint, a table can only have one
	 */
	primary() {
		this.__columnInfo.isPrimary = true;
		if (this.__columnInfo.isOptional === null) this.__columnInfo.isOptional = false;
		return this;
	}

	/**
	 * create a foreign key relationship to an existing table
	 *  table can have multiple or no foreign key.
	 * @param tableName refrenced table name
	 */
	references(tableName: string) {
		this.__columnInfo.isForeign = true;
		this.__columnInfo.refrenceTabelName = tableName;
		return new ForeignConstraint(this);
	}

	/**
	 * make a row value unique, if inserted value
	 * exists it will throw an error
	 */
	unique() {
		if (!this.__columnInfo.query?.includes("UNIQUE")) {
			this.__columnInfo.query += " UNIQUE";
		}
		return this;
	}

	/**
	 * make this column cannot be null and must be filled on insert
	 * unless this column is auto incremented or have default a value
	 */
	notNull() {
		if (!this.__columnInfo.query?.includes("NOT NULL")) {
			this.__columnInfo.query += " NOT NULL";
			if (this.__columnInfo.isOptional === null) this.__columnInfo.isOptional = false;
		}
		return this;
	}

	/**
	 * set a default value if the column value is not defined on insert
	 * set this to "@NOW" to set default as CURRENT_TIMESTAMP
	 * @param {value|"@NOW" } default value if it wasnt inserted
	 */
	default(value: string | "@NOW") {
		if (!this.__columnInfo.query?.includes(`DEFAULT`)) {
			this.__columnInfo.isOptional = true;
			if (value === "@NOW") {
				this.__columnInfo.query += " DEFAULT CURRENT_TIMESTAMP";
			} else {
				this.__columnInfo.query += ` DEFAULT ${value}`;
			}
		}
		return this;
	}
}

export class IdConstraint implements ColInfoable {
	__columnInfo: ColumnInfo;

	constructor(previousColInfo: ColumnInfo) {
		this.__columnInfo = previousColInfo;
	}

	/**
	 * sql PRIMARY constraint, a table can only have one
	 */
	primary() {
		this.__columnInfo.isPrimary = true;
		return this;
	}

	/**
	 * create a foreign key relationship to an existing table
	 *  table can have multiple or no foreign key.
	 * @param tableName refrenced table name
	 */
	references(tableName: string) {
		this.__columnInfo.isForeign = true;
		this.__columnInfo.refrenceTabelName = tableName;
		return new ForeignConstraint(this);
	}

	/**
	 * auto incremet the id
	 */
	incremented() {
		this.__columnInfo.query += " AUTO_INCREMENT";
		return this;
	}
}

export class ForeignConstraint implements ForkeyConstraintable {
	private state: ColInfoable;

	constructor(previousClass: ColInfoable) {
		this.state = previousClass;
	}

	/**
	 * set the referenced column name for this froeign key
	 * @param columnName the referenced column name for this foreign key
	 */
	on(columnName: string) {
		this.state.__columnInfo.referenceColName = columnName;
		return this.state;
	}
}
