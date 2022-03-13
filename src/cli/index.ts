//CLI INDEX.JS
import { program } from "commander";

program
    .name("pukis")
    .description("mini ORM created by William KMP and Andre Wijaya")
    .version('1.0.0');

//TODO
program
    .command("init")
    .description("initialize schema for your database")
    .action(()=>{
		//TODO: implement action generate schema/schema.js at client project dir
        
	});

    //TODO: add migrate command

//TODO: add generate command
