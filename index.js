var GitHubApi = require("github");
var denodeify = require('denodeify');

function getPublicOrganisationRepositoriesFor(origanisation, getForOrg, github, repositories, page) {
	repositories = repositories || [];
	page = page || 1;
	return getForOrg({
		org: origanisation,
		type: 'public',
		page: page
	}).then(response => {
		repositories = repositories.concat(response.data.map((datum) => {
			var name = datum.name;
			var git_url = datum.git_url;
			return {
				name: name,
				url: git_url
			};
		}));

		if (github.hasNextPage(response)) {
			return getPublicOrganisationRepositoriesFor(origanisation, getForOrg, github, repositories, page + 1)
		} else {
			return repositories;
		}
	});
};

/**
 * Create a package data object.
 * @param {String} token - The oauth token to use when authenticating against Github.
 * @throws {TypeError} Will throw if any options are invalid.
 */
module.exports = function getPublicOrganisationRepositoriesFactory(token) {
	if (typeof token !== 'string') {
		throw new TypeError(`Expected token to be type string, was given type ${typeof token}`);
	}

	var github = new GitHubApi({
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

	var getForOrg = denodeify(github.repos.getForOrg.bind(github.repos));

	return function getPublicOrganisationRepositories(organisation) {
		if (typeof organisation !== 'string') {
			throw new TypeError('Expected organisation to be type string, was given type ' + typeof organisation);
		}
		return getPublicOrganisationRepositoriesFor(organisation, getForOrg, github, [], 1);
	}
};
