import {sep} from 'path';
import {getPatternIdRegistry, resolvePatternFilePath} from 'patternplate-transforms-core';
import tryRequire from 'try-require';

const detect = /@import(.+?)["|'](.*)["|'];/g;

export default application => {
	return async (file, demo, configuration) => {
		const patternConfig = application.configuration.patterns;
		const resultName = patternConfig.formats[configuration.outFormat].name;

		const source = file.buffer.toString('utf-8');
		const registry = getPatternIdRegistry(file.dependencies);
		const resolve = configuration.resolve;

		const rewritten = source.replace(detect, (match, option, name) => {
			const resolvedPath = resolvePatternFilePath(
					registry, resolve,
					resultName, configuration.outFormat,
					name, file.pattern.path)
				.split(sep)
				.join('/');

			if (resolvedPath) {
				return `@import${option}'${resolvedPath}';`;
			}

			const npmPath = tryRequire.resolve(name.replace('npm://', ''));

			if (npmPath) {
				const packageName = name.replace('npm://', '').split('/')[0];
				file.meta.dependencies.push(packageName);
				return match;
			}

			throw new Error(
				[
					`Could not resolve dependency ${name} for`,
					`${file.pattern.id}:${file.name}, it is not`,
					`in pattern.json and could not be resolved from npm.`,
					`Available pattern dependencies:`,
					Object.keys(file.dependencies).join(', ')
				].join(' ')
			);
		});

		file.buffer = rewritten;
		return file;
	};
};
