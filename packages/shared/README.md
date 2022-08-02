# `@siiges-services/shared`

## Before usage

1. Check if your branch is updated, if not run `git pull --rebase upstream master` (if you are in master branch you should use a normal pull)

2. Run `yarn bootstrap` in your root folder

3. Check if your package has linked this package. To do that go to its package.json file and there in depencies section should be listed `@siiges-services/shared`.
If not run `lerna add @siiges-services/shared scoope=@siiges-services/your-package-name`

## Usage

This package contain code that will be useful in all packages.

In this moments here are 2 useful modules


## Utils

Module which have three more modules within:

### checkers
Set of 4 functions:

Import  them to your package:
```
const checkers = require('@siiges-services/shared/utils/checkers');
```

- isString: take one argument and check if its a string (return true) or not (return false).
Import  it to your package:
```
const { isString } = require('@siiges-services/shared/utils/checkers');
```

- isUndefined take one argument and check if its a undefined (return true) or not (return false).
Import  it to your package:
```
const { isUndefined } = require('@siiges-services/shared/utils/checkers');
```

- isProduction: take a string as argument and check if it's equal to 'production' (return true) or not (return false). Useful to check node environment
Import  it to your package:
```
const { isProduction } = require('@siiges-services/shared/utils/checkers');
```

- isDevelopment: take a string as argument and check if it's equal to 'development' (return true) or not (return false). Useful to check node environment
Import  it to your package:
```
const { isDevelopment } = require('@siiges-services/shared/utils/checkers');
```

### Logger

Utility to display project state information. To import it in your current file

```
const { Logger } = require('@siiges-services/shared/utils');
```

### Constants

This package have a set of Constans usefull in all the project.
- **softwareEnvironments** This is object where you can add or get supported environments in this project.
To import all of them in your current file write

```
const { constants } = require('@siiges-services/shared/utils');

```

## Adapters
Module which have three more modules within:

### dotenv
Module with one function wich configure dotenv package. So when you need to get environment vars import it.

- config-path: take no arguments and congifigure dotenv package. Configurations made by this function:
1. Our file .env will be in the root directory of this monorepo
2. We are not going to user .env file, instead we are going to use development.env or production.env depending on node configurations.
Use  it in your package:
```
const { dotenv } = require('@siiges-services/shared/adapter');

dotenv.configPath();
```
### nodejs
Module with one function wich get you the current node environment
-getEnvironment: takes no argument and return node environment.
**Note** if node environment is set different to development or production, this functions will throw TypeError function.
**Note** if node environment is not set (undefined), this function will throw a reference error.
Use  it in your package:
```
const { nodejs } = require('@siiges-services/shared/adapter');

const environment = nodejs.getEnvironment();
```
### environment-vars
Module with one function, which get an environment variable
- getEnvironmentVar take an environment var name as argument and get its environment value.
**Note** if the environment var is not set (undefined) is going to throw Reference error
**Note** use this function to get your environment vars instead of process.env to prevent errors.
```
const { getEnvironmentVar } require('@siiges-services/shared/adapter');
const myValue = getEnvironmentVar(ENV_VAR_NAME);
```
