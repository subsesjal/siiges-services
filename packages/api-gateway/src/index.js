// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const HttpServer = require('./drivers/http/server');

HttpServer.start().catch((err) => Logger.error('Something went wrong when running server', err));
