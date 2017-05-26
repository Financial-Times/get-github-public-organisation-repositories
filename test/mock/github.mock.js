'use strict';

const sinon = require('sinon');

const Github = module.exports = sinon.stub();

const mockGithub = module.exports.mockGithub = {
	authenticate: sinon.stub(),
	hasNextPage: sinon.stub(),
	repos: {
		getForOrg: sinon.stub()
	}
};

Github.returns(mockGithub);
