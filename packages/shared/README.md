# `@siiges-services/shared`

## Before usage

1. Check if your branch is updated, if not run `git pull --rebase upstream master` (if you are in master branch you should use a normal pull)

2. Run `yarn bootstrap` in your root folder

3. Check if your package has linked this package. To do that go to it's package.json file and there in depencies section should be listed `@siiges-services/shared`.
If not run `lerna add @siiges-services/shared scoope=@siiges-services/your-package-name`

# Usage

This package contain code that will be useful in all packages.

In this moments here are 5 useful modules

# checkers
Module with a set of functions to validate something. Almost all of them has their negation:

Import  them to your package:
```
const { checkers }= require('@siiges-services/shared');
```
## General checker
Receive two variable as parameters
1 the first is the variable to check
2 the second one is to check the type of data
**Note:** If there is a checker to check the datatype object use that instead of this function
### isThisDatatype
```
const { checkers } = require('@siiges-services/shared');

const obj = { name: 'siiges' };

checkers.isThisDatatype(obj, 'object');
```

## Node environment
You can use function to check in which environment node is set
- isProdEnvironment
- isDevEnvironment
- isTestEnvironment

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

### isTestEnvironment

This function takes a string as argument and check if it's equal to 'test' (return true) or not (return false). Useful to check node environment
Import it to you package:
```
const { checkers } = require('@siiges-services/shared');

const test = 'test';
const dev = 'development';

checkers.isTestEnvironment(test) // return false
checkers.isTestEnvironment(dev) // return true
```

## Check falsy values

Receive a variable as a parameter and check if is truthy or falsy

### isFalsy and isTruthy
```
const { checkers } = require('@siiges-services/shared');

const truthy = 'value'
const falsy = []

checkers.isFalsy(truthy) // return false
checkers.isFalsy(falsy) // return true

checkers.isTruthy(truthy) // return true
checkers.isTruthy(falsy) // return false
```

## Numbers
Receive a variable as a parameter and check if is a number or not

### isNumber and isNotNumber
```
const { checkers } = require('@siiges-services/shared');

const number = 123
const string = 'This is a string'

checkers.isNumber(number) // return True
checkers.isNumber(string) // return False

checkers.isNotNumber(number) // return False
checkers.isNotNumber(string) // return True
```

## Null
Receive a variable as a parameter and checke if is null or not
### isNull and isNotNull
```
const { checkers } = require('@siiges-services/shared');

const NULL = null
const something = 1234

checkers.isNull(NULL) // return True
checkers.isNull(something) // return False

checkers.isNotNull(NULL) // return False
checkers.isNotNull(something) // return True
```

##  String
Receive a variable as a parameter and check if is a string or not. To do that you have to:
### isSTring and isNotString
```
const { checkers } = require('@siiges-services/shared/utils/checkers');

const string = 'This is a string'
const number = 23

checkers.isString(string); // return true
checkers.isString(number); // return false

checkers.isNotString(string); // return false
checkers.isNotString(number); // return false
```

## Undefined
Receive a variable as a parameter and check if is defined or undefined
### isUndefined and isDefined
```
const { checkers } = require('@siiges-services/shared');

const UNDEFINED = undefined;
const string = 'return false'

checkers.isUndefined(UNDEFINED) // return true
checkers.isUndefinedd(string) // return false

checkers.isDefined(UNDEFINED) // return false
checkers.isDefined(string) // return true
```

## Special checkers
### throwErrorIfDataIsFalsy
Receive a variable as a parameter and throw error if is falsy
```
const { checkers } = require('@siiges-services/shared');

const name = []
const organization = 'SICYT'

checkers.throwErrorIfDataIsFalsy(name) //Throw error
checkers.throwErrorIfDataIsFalsy(organization) //Do nothing
```

## Logger

Utility to display project state information. To import it in your current file

```
const { Logger } = require('@siiges-services/shared');

Logger.info('This is something that will show in the terminal and save in a file');
```

## Constants

This package have a set of Constans usefull in all the project.

### softwareEnvironments
This is object where you can add or get supported environments in this project.
To import all of them in your current file write

```
const { constants } = require('@siiges-services/shared');

constants.softwareEnvironments
```

### rootDir
This constants tell you where is the root project dir.
```
const { constants } = require('@siiges-services/shared');

constants.rootDir;
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
 ## Validation

 ### validate
 Receive an object with three keys
 1 nameVar
 2 valueVar
 3 expectedDatatype
 In base in this check if the data is the datatype expected if not call Logger.warn function.

 ```
 const { validate } = require('@siiges-services/shared');

 const string = 'string'
 const number 1

 validate({nameVar: 'string', valueVar: string, expectedDatatype: 'string' }) // Do nothing
 validate({nameVar: 'number', valueVar: number, expectedDatatype: 'string' }) // Call Logger.warn and show  this message `[shared/validate] TypeError this ${nameVar} \
is not "${expectedDatatype}"`
 ```
