'use strict';

const {Octokit} = require('@octokit/rest');

async function getPublicOrganisationRepositoriesFor(origanisation, privateReposToInclude, octokit) {
	const repos = await octokit.paginate(octokit.repos.listForOrg.endpoint.merge({
		org: origanisation,
		type: 'all'
	}));
	const repositories = repos.filter((repo) => {
		if (repo.private && privateReposToInclude.includes(repo.name)) {
			return true;
		}
		return !repo.private;
	}).map((repo) => {
		return {
			name: repo.name,
			url: repo.clone_url
		};
	});
	return repositories;
}

/**
 * Create a package data object.
 * @param {String} token - The oauth token to use when authenticating against Github.
 * @throws {TypeError} Will throw if any options are invalid.
 */
module.exports = function asyncgetPublicOrganisationRepositoriesFactory(token) {
	if (typeof token !== 'string') {
		throw new TypeError(`Expected token to be type string, was given type ${typeof token}`);
	}

	const octokit = new Octokit({
		baseUrl: 'https://api.github.com',
		auth: token
	});

	return function getPublicOrganisationRepositories(organisation, privateReposToInclude) {
		privateReposToInclude = privateReposToInclude || [];
		if (typeof organisation !== 'string') {
			throw new TypeError('Expected organisation to be type string, was given type ' + typeof organisation);
		}
		if (!Array.isArray(privateReposToInclude)) {
			throw new TypeError('Expected privateReposToInclude to be type array, was given type ' + typeof privateReposToInclude);
		}
		return getPublicOrganisationRepositoriesFor(organisation, privateReposToInclude, octokit);
	};
};
