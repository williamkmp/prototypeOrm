export interface ColumnInfo{
    name: string | null;
    query: string | null;
    type: "string" | "number" | "boolean" | null;
    
    isPrimary: boolean;
    isIncremented: boolean;

    isForeign: boolean;
    refrenceTabelName: string | null;
    referenceColName: string | null; 
}

export interface ColInfoable {
    __columnInfo: ColumnInfo;
}

export class ColumnSchema implements ColInfoable{
    __columnInfo: ColumnInfo;

    constructor(){
        this.__columnInfo = {
            name: null,
            query: null,
            type: null,
            isPrimary: false,
            isIncremented: false,
            isForeign: false,
            referenceColName: null,
            refrenceTabelName: null
        } 
    }
   
}