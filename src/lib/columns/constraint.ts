import { ColInfoable, ColumnInfo } from "../TypeDeclaration/type.js";

export class ColumnConstraint implements ColInfoable{
    __columnInfo: ColumnInfo;
    
    constructor(previousColInfo: ColumnInfo){
        this.__columnInfo = previousColInfo;
    }

    //TODO: Implement all col constraint
}