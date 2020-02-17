'use strict';

const GitHubApi = require('github');
const denodeify = require('denodeify');

function getPublicOrganisationRepositoriesFor(origanisation, privateWhitelist, getForOrg, github, repositories, page) {
	repositories = repositories || [];
	page = page || 1;
	return getForOrg({
		org: origanisation,
		page: page
	}).then(response => {
		const newRepositories = response.data
			.filter((repo) => {
				if (repo.private && privateWhitelist.includes(repo.name)) {
					return true;
				}
				return !repo.private;
			})
			.map((repo) => {
				return {
					name: repo.name,
					url: repo.clone_url
				};
			});
		repositories = repositories.concat(newRepositories);

		if (github.hasNextPage(response)) {
			return getPublicOrganisationRepositoriesFor(origanisation, privateWhitelist, getForOrg, github, repositories, page + 1);
		} else {
			return repositories;
		}
	});
}

/**
 * Create a package data object.
 * @param {String} token - The oauth token to use when authenticating against Github.
 * @throws {TypeError} Will throw if any options are invalid.
 */
module.exports = function getPublicOrganisationRepositoriesFactory(token) {
	if (typeof token !== 'string') {
		throw new TypeError(`Expected token to be type string, was given type ${typeof token}`);
	}

	const github = new GitHubApi({
		protocol: 'https',
		host: 'api.github.com',
		pathPrefix: '',
		Promise: global.Promise,
		timeout: 5000,
	});

	github.authenticate({
		type: 'oauth',
		token: token
	});

	const getForOrg = denodeify(github.repos.getForOrg.bind(github.repos));

	return function getPublicOrganisationRepositories(organisation, privateWhitelist) {
		privateWhitelist = privateWhitelist || [];
		if (typeof organisation !== 'string') {
			throw new TypeError('Expected organisation to be type string, was given type ' + typeof organisation);
		}
		if (!Array.isArray(privateWhitelist)) {
			throw new TypeError('Expected privateWhitelist to be type array, was given type ' + typeof privateWhitelist);
		}
		return getPublicOrganisationRepositoriesFor(organisation, privateWhitelist, getForOrg, github, [], 1);
	};
};
