//exporting all client code
import * as pukis from "./client/index.js";
import { col } from "./lib/columns/column.js";
import { TableSchema } from "./lib/table/tableSchema.js";

//check if client is an empty object or not
if(pukis && Object.keys(pukis).length === 0){
    //imported client is an empty object throw error 
    // throw new Error('client not generated, please run "npx pukis generate"');
    // console.warn('client not generated, please run "npx objectp generate"');
}

//TODO: test export using commonjs and ESmodules in schema/schema.js and client directory
export {col} 

export default { ...pukis }
