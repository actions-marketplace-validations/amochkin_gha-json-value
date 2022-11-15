import * as core from '@actions/core';
import * as path from 'path';
import * as fs from 'fs';
import { getValueByPath } from '@xorde-labs/ferramenta';

const workspace = process.env.GITHUB_WORKSPACE ?? './';

export const run = () => {
	try {
		const file = path.join(workspace, core.getInput('file') ?? 'package.json');
		const property = core.getInput('property') ?? 'version';
		const jsonPath = property.split('.');
		const jsonObject = JSON.parse(fs.readFileSync(file).toString());

		core.debug(`file: ${file}`);
		core.debug(`property: ${property}`);
		core.debug(`jsonPath: ${jsonPath}`);
		core.debug(`jsonObject: ${jsonObject}`);

		if (!jsonObject) {
			core.setFailed('Invalid JSON file');
			return;
		}

		const value = getValueByPath(jsonObject, jsonPath);

		core.info(`File=${file} Property=${property} Value=${value}`);
		core.setOutput('value', value);
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error);
		} else {
			core.setFailed(String(error));
		}
	}
};
