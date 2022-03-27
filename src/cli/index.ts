#!/usr/bin/env node
//CLI INDEX.JS
import { program } from "commander";
import { SchemaManager } from "../lib/TypeDeclaration/type.js";

program.name("objectp").description("mini ORM created by William KMP").version("0.0.1");

program
	.command("init")
	.description("initialize schema for your database")
	.action(async (): Promise<void> => {
		let clientSchemaManager = new SchemaManager();
		clientSchemaManager.create();
		return;
	});

program
	.command("migrate")
	.description("migrate schema.js to the specified database")
	.action(async (): Promise<void> => {
		//TODO: implement migrate command action
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
