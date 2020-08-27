
Get Github Public Organisation Repositories [![NPM version](https://img.shields.io/npm/v/github-public-organisation-repositories.svg)](https://www.npmjs.com/package/github-public-organisation-repositories) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)][license]
===============

Provides a method which will scan a Github Organisation for all public repositories, it can also return private repositories if explicitly requested.

Table Of Contents
-----------------

  - [Usage](#usage)
    - [Requirements](#requirements)
    - [API Documentation](#api-documentation)
  - [Contributing](#contributing)
  - [Publishing](#publishing)
  - [Support and Migration](#support-and-migration)
  - [Contact](#contact)
  - [Licence](#licence)


Usage
-----

### Requirements

Requires [Node.js] 6.x and [npm]. You can install with:

```sh
npm install github-public-organisation-repositories
```

### API Documentation

This library makes use of [promises] – familiarity is assumed in the rest of the API documentation. You'll also need to require the module with:

```js
const getPublicOrganisationRepositoriesFactory = require('github-public-organisation-repositories');
```

### `getPublicOrganisationRepositoriesFactory( token )`

This function returns the function used to retrieve the list of repositories from a Github organisation. The token parameter is required and should be the OAuth token used to authenticate with Github.

### `getPublicOrganisationRepositoriesFactory( token )(organisation, [privateWhitelist])`

Returns a promise containing the list of repositories from the requested `organisation` on Github. If the `privateWhitelist` parameter is used, it will also include those private repositories in the resolved promise if they exist in the requested `organisation` on Github.

Contributing
------------

This module has a suite of unit tests, and is verified with ESLint. You can use the following commands to check your code before opening a pull request.

```sh
make verify  # verify JavaScript code with ESLint
make test    # run the unit tests and check coverage
```

Publishing
----------

New versions of the module are published automatically by CI when a new tag is created matching the pattern `/v.*/`.


Support and Migration
---------------------

Major versions are normally supported for 3–6 months after their last minor release. This means that patch-level changes will be added and bugs will be fixed. The table below outlines the end-of-support dates for major versions, and the last minor release for that version.

We also maintain a [migration guide](MIGRATION.md) to help you migrate.

| :grey_question: | Major Version | Last Minor Release | Node.js Versions | Support End Date |
| :-------------- | :------------ | :----------------- | :--------------- | :--------------- |
| :heart:         | 1             | N/A                | 6+               | N/A              |

If you're opening issues related to these, please mention the version that the issue relates to.


Contact
-------

If you have any questions or comments about this module, or need help using it, please either [raise an issue][issues], visit [#origami-support] or email [Origami Support].


Licence
-------

This software is published by the Financial Times under the [MIT licence][license].



[#origami-support]: https://financialtimes.slack.com/messages/origami-support/
[issues]: https://github.com/Financial-Times/get-github-public-organisation-repositories/issues
[license]: http://opensource.org/licenses/MIT
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[origami support]: mailto:origami-support@ft.com
[promises]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
