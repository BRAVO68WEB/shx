import inquirer from 'inquirer';

export default async (gistOptions: any) => {
	console.log('Creating a new gist ...\n');
	const configQuestions = await inquirer.prompt([
		{
			type: 'editor',
			name: 'gist',
			message: 'Content of the gist',
		},
	]);

	console.log(configQuestions.gist);

	console.log('\nConfiguration saved!');
	return;
};
