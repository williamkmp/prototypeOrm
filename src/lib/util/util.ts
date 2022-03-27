
/**
 * convert any string into CAPTALIZED_NAME
 * @param str table name
 * @returns 
 */
export function capitalize(str: string) {
	return str.replace(" ", "_").replace(/\W/g, "").toUpperCase();
}

/**
 * convert any string t=inti camelCase
 * @param str input string 
 * @returns 
 */
function camelize(str: string): string {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, "");
}