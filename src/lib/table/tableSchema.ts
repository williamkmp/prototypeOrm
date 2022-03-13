import { ColumnSchema } from "../columns/column.js"

export class TableSchema{
    name: string;
    primaryColumn: ColumnSchema | null;
    columnsArray: Array<ColumnSchema>;
      
    constructor(name: string, columnSchemas: Array<ColumnSchema>){
        this.name = name;
        this.primaryColumn = null;
        columnSchemas.forEach((columnSchema) => {
            if(columnSchema.__columnInfo.isPrimary){
                this.primaryColumn = columnSchema;
            }
        });
        this.columnsArray = columnSchemas;
    }
}