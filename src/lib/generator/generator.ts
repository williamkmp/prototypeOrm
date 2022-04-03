import { TableSchema, Config  } from "../TypeDeclaration/type.js";

export const GENERATE = {
	get(schema: TableSchema): string {
		return "";
	},
	create(schema: TableSchema): string {
		return "";
	},
	delete(schema: TableSchema): string {
		return "";
	},
	update(schema: TableSchema): string {
		return "";
	},
};

export const GENERATE_DECALRATION = {
	query(schema: TableSchema): string {
		return "";
	},
	model(schema: TableSchema): string {
		return "";
	},
};

export function SINGLETON(config: Config){
    
};
