import { equal } from 'assert';
import { expect } from 'chai';

describe('Simple test', () => {
	it('is variable hello?', () => {
		const variable: string | undefined = 'hello';

		equal(variable, 'hello', 'variable is not "hello"');
	});
});