#!/usr/bin/env node
//CLI INDEX.JS
import { program } from "commander";
import { SchemaManager, MigrationHandler } from "../lib/TypeDeclaration/type.js";

let clientSchemaManager = new SchemaManager();
program.name("objectp").description("mini ORM created by William KMP").version("0.0.1");

program
	.command("init")
	.description("initialize schema for your database")
	.action(async (): Promise<void> => {
		clientSchemaManager.create();
		console.log("\nSchema file created\n");
		return;
	});

program
	.command("migrate")
	.description("migrate schema.js to the specified database")
	.action(async (): Promise<void> => {
		console.log("\nMigration started");
		let clientSchema = await clientSchemaManager.readSchema();
		if (clientSchema) {
			let migrator = new MigrationHandler(clientSchema);
			let status = await migrator.migrate();
			status ? console.log("Migration success") : console.log("Migration failed");
		}
		console.log("Migration finished\n");
		return;
	});

program
	.command("generate")
	.description("generate client code API to interact with database")
	.action(async (): Promise<void> => {
		//TODO: implement generate command action
		return;
	});

program.parse(process.argv);
