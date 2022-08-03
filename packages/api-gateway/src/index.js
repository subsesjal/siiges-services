// Internal dependencies
const { Logger } = require('@siiges-services/shared');
const HttpServer = require('./drivers/http/server');

// External dependencies

HttpServer.start().catch((err) => Logger.error('Something went wrong when running server', err));
