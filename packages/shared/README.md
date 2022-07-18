# `@siiges-services/shared`

## Before usage

1. Check if your branch is updated, if not run `git pull --rebase upstream master` (if you are in master branch you should use a normal pull)

2. Run `yarn bootstrap` in your root folder

3. Check if your package has linked this package. To do that go to its package.json file and there in depencies section should be listed `@siiges-services/shared`.
If not run `lerna add @siiges-services/shared scoope=@siiges-services/your-package-name`

## Usage

This package contain code that will be useful in all packages.

In this moments here are 3 useful tools


### softwareEnvironments

This is object where you can add or get supported environments in this project. To import it in your current file

```
const { softwareEnvironments } = require('@siiges-services/shared');
```

### dotenvPath

This is the path where the file .env will be storage. To import it in your current file

```
const { dotenvPath } = require('@siiges-services/shared');
```

**Note:** This file will not be .env it's going to be production.env or development.env depending on which environment we are running the project.

### Logger

Utility to display project state information. To import it in your current file

```
const { Logger } = require('@siiges-services/shared');
```
### Import all utilities
Also you an import all utilities and acces to them like an object

```
const shared = require('@siiges-services/shared');

shared.Logger
shared.softwareEnvironments
shared.dotenvPath
```
