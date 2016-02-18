import {sep} from 'path';
import {
	getPatternIdRegistry,
	resolvePatternFilePath
} from 'patternplate-transforms-core';

const detect = /@import(.+?)["|'](.*)["|'];/g;

export default application => {
	return async (file, demo, configuration) => {
		const patternConfig = application.configuration.patterns;
		const resultName = patternConfig.formats[configuration.outFormat].name;

		const source = file.buffer.toString('utf-8');
		const registry = getPatternIdRegistry(file.dependencies);
		const resolve = configuration.resolve;

		const rewritten = source.replace(detect, (match, option, name) => {
			let result = match;

			const resolvedPath = resolvePatternFilePath(
					registry, resolve,
					resultName, configuration.outFormat,
					name, file.pattern.path)
				.split(sep)
				.join('/');

			const fromNPM = name.includes('npm://') || name.includes('node_modules/');

			if (!resolvedPath && !fromNPM) {
				throw new Error(
					`Could not resolve dependency ${name}. Neither in pattern.json nor from npm.`);
			} else if (!resolvedPath && fromNPM) {
				const packageName = name.replace('npm://', '').split('/')[0];
				file.meta.dependencies.push(packageName);
			} else {
				result = `@import${option}'${resolvedPath}';`;
			}

			return result;
		});

		file.buffer = rewritten;
		return file;
	};
};
