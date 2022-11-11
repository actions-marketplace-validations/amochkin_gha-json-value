import * as core from '@actions/core';
import * as path from 'path';
import * as fs from 'fs';
import { getValueByPath } from '@xorde-labs/ferramenta';

const workspace = process.env.GITHUB_WORKSPACE ?? './';

export const run = () => {
	try {
		const file = core.getInput('file') ?? path.join(workspace, 'package.json');
		const jsonPath = core.getInput('property').split('.');
		const jsonObject = JSON.parse(fs.readFileSync(file).toString());

		const value = getValueByPath(jsonObject, jsonPath);

		core.setOutput('value', value);
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error);
		} else {
			core.setFailed(String(error));
		}
	}
};
