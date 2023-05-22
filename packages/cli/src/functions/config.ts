import { configFile } from "../shx"
import inquirer from 'inquirer';

// TODO: Do a /me request to the server to validate the token

export default async () => {
	console.log("SHX CLI configuration wizard ...\n");
	const configQuestions = await inquirer.prompt([
		{
			type: "input",
			name: "serverurl",
			message: "What is the URL of your SHX server?",
			default: configFile.get("serverurl"),
		},
		{
			type: "password",
			name: "token",
			message: "What is your SHX token?",
			default: configFile.get("token"),
		}
	]);


	configFile.set("serverurl", configQuestions.serverurl);
	configFile.set("token", configQuestions.token);
	console.log("\nConfiguration saved!");
	return;
};
