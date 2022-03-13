//exporting all client code
import * as client from "./client/index.js";

//check if client is an empty object or not
let exportObject;
if(client && Object.keys(client).length === 0){
    //imported client is an empty object throw error 
    exportObject = new Error('client not generated, please run "nps pukis generate"');
    throw new Error('client not generated, please run "nps pukis generate"');
}else{
    //imported client is not empty, export code
    exportObject = client
}

export = exportObject;