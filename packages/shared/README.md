# `@siiges-services/shared`

## Before usage

1. Check if your branch is updated, if not run `git pull --rebase upstream master` (if you are in master branch you should use a normal pull)

2. Run `yarn bootstrap` in your root folder

3. Check if your package has linked this package. To do that go to its package.json file and there in depencies section should be listed `@siiges-services/shared`.
If not run `lerna add @siiges-services/shared scoope=@siiges-services/your-package-name`

## Usage

This package contain code that will be useful in all packages.

In this moments here are 2 useful tools


## Logger

Utility to display project state information. To import it in your current file

```
const { Logger } = require('@siiges-services/shared');
```
## Constants

This package have a set of Constans usefull in all the project.
- **softwareEnvironments** This is object where you can add or get supported environments in this project.
- **dotenvPath**  This is the path where the file .env will be storage.
**Note:** This file will not be .env it's going to be production.env or development.env depending on which environment we are running the project.

To import all of them in your current file write

```
const { constants } = require('@siiges-services/shared');

// If you just want one of them you could use destructuring object
const { softwareEnvironments } = require('@siiges-services/shared');
const { dotenvPath } = require('@siiges-services/shared');

```

### softwareEnvironments

 To import it in your current file

```
const { softwareEnvironments } = require('@siiges-services/shared');
```

### dotenvPath

 To import it in your current file

```
const { dotenvPath } = require('@siiges-services/shared');
```



## Import all utilities
Also you an import all utilities and acces to them like an object

```
const shared = require('@siiges-services/shared');

shared.Logger
shared.softwareEnvironments
shared.dotenvPath
```
