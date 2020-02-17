'use strict';

const assert = require('proclaim');

describe('end-to-end tests', function() {
	this.timeout(10 * 60 * 1000);

	let getPublicOrganisationRepositoriesFactory;

	beforeEach(function() {
		getPublicOrganisationRepositoriesFactory = require('../..');
	});

	context('no token', function(){
		it('throws a TypeError', function() {
			assert.throws(function() {
				getPublicOrganisationRepositoriesFactory();
			}, TypeError);
		});
	});

	context('invalid token', function() {
		it('throws a TypeError', function() {
			assert.throws(function() {
				getPublicOrganisationRepositoriesFactory('invalid token')();
			}, TypeError);
		});
	});

	context('valid token for financial-times which can read private and public repositories', function() {
		context('privateReposToInclude is undefined', function() {
			it('returns a Promise containing an array of objects which represent repositories for the organisation', async function() {
				const repos = await getPublicOrganisationRepositoriesFactory(process.env.TEST_TOKEN)('financial-times');
				assert.isArray(repos);
				for (const repo of repos) {
					assert.isObject(repo);
					assert.isString(repo.name);
					assert.isString(repo.url);
				}
			});
		});

		context('privateReposToInclude is defined', function() {
			it('returns a Promise containing an array of objects which represent repositories for the organisation', async function() {
				const repos = await getPublicOrganisationRepositoriesFactory(process.env.TEST_TOKEN)('financial-times', ['o-fonts-assets']);
				assert.isArray(repos);
				const oFontsAssets = repos.find(({name}) => name === 'o-fonts-assets');
				assert.isObject(oFontsAssets);
			});
		});
	});
});
