export const BOILERPLATE = 
`import { col } from "objectp";

//DO NOT REMOVE OR CHANGE THIS CONST NAME but you can change the content
export const DATABASE_CONFIG = {
	host: "localhost",
	database: "database_name",
	user: "root",
	password: "password",
};

//sample table delete or replace this with your schema
export const persons = [
	col("id").id().primary().incremented(),
	col("name").string().notNull(),
    col("birthday").dateTime().default("@NOW"),
	col("age").integer("TINY"),
];

export const pets = [
    col("id").id().primary().incremented(), 
    col("personId").id().references("persons").on("id"),
    col("name").string(20).notNull(),
];
`;