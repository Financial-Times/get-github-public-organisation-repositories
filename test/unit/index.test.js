'use strict';

const assert = require('proclaim');
const mockery = require('mockery');

describe('index', () => {
	let Github;
	let getPublicOrganisationRepositoriesFactory;

	beforeEach(() => {
		Github = require('./mock/github.mock');
		mockery.registerMock('github', Github);

		getPublicOrganisationRepositoriesFactory = require('../..');
	});

	it('exports a function', () => {
		assert.isFunction(getPublicOrganisationRepositoriesFactory);
	});

	describe('getPublicOrganisationRepositoriesFactory()', () => {
		it('throws a TypeError because of missing token parameter', () => {
			assert.throws(() => {
				getPublicOrganisationRepositoriesFactory();
			}, TypeError);
		});
	});

	describe('getPublicOrganisationRepositoriesFactory(token)', () => {
		let token;
		let getPublicOrganisationRepositories;

		beforeEach(() => {
			token = 'abcdef';
			getPublicOrganisationRepositories = getPublicOrganisationRepositoriesFactory(token);
		});

		it('constructs a github client', () => {
			assert.calledOnce(Github);
			assert.calledWith(Github, {
				protocol: 'https',
				host: 'api.github.com',
				pathPrefix: '',
				Promise: global.Promise,
				timeout: 5000,
			});
		});

		it('authenticates using oauth and token provided', () => {
			assert.calledOnce(Github.mockGithub.authenticate);
			assert.calledWith(Github.mockGithub.authenticate, {
				type: 'oauth',
				token: token
			});
		});

		it('returns a function', () => {
			assert.isFunction(getPublicOrganisationRepositories);
		});

		describe('getPublicOrganisationRepositories()', () => {
			it('throws a TypeError because of missing organisation parameter', () => {
				assert.throws(() => {
					getPublicOrganisationRepositories();
				}, TypeError);
			});
		});

		describe('getPublicOrganisationRepositories("financial-times")', () => {
			it('returns a promise', () => {
				assert.instanceOf(getPublicOrganisationRepositories('financial-times'), Promise);
			});
		});
	});

});
