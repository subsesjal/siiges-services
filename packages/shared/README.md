# `@siiges-services/shared`

## Before usage

1. Check if your branch is updated, if not run `git pull --rebase upstream master` (if you are in master branch you should use a normal pull)

2. Run `yarn bootstrap` in your root folder

3. Check if your package has linked this package. To do that go to it's package.json file and there in depencies section should be listed `@siiges-services/shared`.
If not run `lerna add @siiges-services/shared scoope=@siiges-services/your-package-name`

## Usage

This package contain code that will be useful in all packages.

In this moments here are 5 useful modules

## checkers
Module with a set of 4 functions:

Import  them to your package:
```
const { checkers }= require('@siiges-services/shared');
```

### isString
This function  takes one argument and check if it's a string (return true) or not (return false).
Import  it to your package:
```
const { checkers } = require('@siiges-services/shared/utils/checkers');

const string = 'Will return true'
const number = 23

checkers.isString(string); // return true
checkers.isString(number); // return false
```

### isUndefined
This function takes one argument and check if it's a undefined (return true) or not (return false).
Import  it to your package:
```
const { checkers } = require('@siiges-services/shared');

const UNDEFINED = undefined;
const string = 'return false'

checkers.isUndefined(UNDEFINED) // return true
checkers.isUndefinedd(string) // return false
```

### isProdEnvironment
This function takes a string as argument and check if it's equal to 'production' (return true) or not (return false). Useful to check node environment
Import  it to your package:
```
const { checkers } = require('@siiges-services/shared');

const prod = 'prudction';
const dev = 'development';

checkers.isProdEnvironment(pord) // return true
checkers.isProdEnvironment(dev) // return false
```

### isDevEnvironment
This function takes a string as argument and check if it's equal to 'development' (return true) or not (return false). Useful to check node environment
Import  it to your package:
```
const { checkers } = require('@siiges-services/shared');

const prod = 'prudction';
const dev = 'development';

checkers.isDevEnvironment(pord) // return false
checkers.isDevEnvironment(dev) // return true
```

## Logger

Utility to display project state information. To import it in your current file

```
const { Logger } = require('@siiges-services/shared/utils');
```

## Constants

This package have a set of Constans usefull in all the project.

### softwareEnvironments
This is object where you can add or get supported environments in this project.
To import all of them in your current file write

```
const { constants } = require('@siiges-services/shared');

```

## dotenv
Module with 2 function wich configure dotenv package. So when you need to get environment vars import it.


###  getEnvironmentVar
This function takes an environment var name as argument and get it's value.
**Note** if the environment var is not set (undefined) is going to throw Reference error
**Note** use this function to get your environment vars instead of process.env to prevent errors.
**Note** here I configured dotenv so configure dot env is not necessary anymore
**dotenv configurations**
1. Our file .env will be in the root directory of this monorepo
2. We are not going to user .env file, instead we are going to use development.env or production.env depending on node configurations.
Use  it in your package:
```
const { dotenv } require('@siiges-services/shared/adapter');
const myValue = dotenv.getEnvironmentVar(ENV_VAR_NAME);
```

## nodejs
Module with one function wich get you the current node environment

### getEnvironment
This function takes no argument and return the current node environment.
**Note** if node environment is set different to development or production, this functions will throw TypeError function.
**Note** if node environment is not set (undefined), this function will throw a reference error.
Use  it in your package:
```
const { nodejs } = require('@siiges-services/shared');

const environment = nodejs.getEnvironment();
```
