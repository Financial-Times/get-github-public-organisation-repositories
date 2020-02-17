'use strict';

const assert = require('proclaim');

describe('index', () => {
	let getPublicOrganisationRepositoriesFactory;

	beforeEach(() => {

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
