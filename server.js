'use strict';

var restify   = require( 'restify' );
var Sequelize = require( 'sequelize' );

Sequelize.LOCAL = new Sequelize( 'inventory', 'quiz16', null, {
	'dialect'  : 'postgres',
	'omitNull' : true
} );

var user_route      = require( './route/users' );
var product_g_route = require( './route/products' );

var server = restify.createServer();

// Configure built-in handlers
server.use( restify.acceptParser( server.acceptable ) );
server.use( restify.queryParser() );
server.use( restify.bodyParser() );
server.use( restify.dateParser() );
server.use( restify.jsonp() );
server.use( restify.gzipResponse() );
server.use( restify.CORS() );

// user route
server.get( '/v1/users', user_route.getUsers );
server.post( '/v1/users', user_route.createUser );
server.post( '/v1/users/:username', user_route.searchUser );
server.get( '/v1/users/:username', user_route.getUser );
server.put( '/v1/users/:id', user_route.updateUser );
server.del( '/v1/users/:id', user_route.deleteUser );
server.post( '/authenticate', user_route.queryLogin );

// global products route
server.post( '/v1/products', product_g_route.createProducts );
server.del( '/v1/products/:id', product_g_route.deleteProduct );
server.get( '/v1/products/:id', product_g_route.getProduct );
server.get( '/v1/products', product_g_route.getProducts );
server.put( '/v1/products/:id', product_g_route.updateProduct );

server.listen( 9000, function() {
	console.log( '%s listening at %s', server.name, server.url );
} );
