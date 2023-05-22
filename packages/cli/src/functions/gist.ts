import inquirer from 'inquirer';

// TODO: Do a /me request to the server to validate the token

export default async () => {
	console.log("Creating a new gist ...\n");
	const configQuestions = await inquirer.prompt([
		{
			type: "editor",
			name: "gist",
			message: "Content of the gist",
		}
	]);

    console.log(configQuestions.gist);

	console.log("\nConfiguration saved!");
	return;
};
