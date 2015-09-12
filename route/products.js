'use strict';

var Products  = require( '../model/Products.js' );

exports.createProducts = function ( req, res, next ) {
	var item = {
		'Name'    : req.params.name,
		'Cost'    : req.params.cost,
		'Income'  : req.params.income,
		'Profit'  : req.params.profit
	};

	Products.create( item ).success( function( data ) {
		res.send( data );
		next();
	} ).error( function ( err ) {
		res.send( err );
	} );
};

exports.getProduct = function ( req, res, next  ) {
	var item = { 'id' : req.params.id };

	Products.find( { 'where' : item } ).success( function ( data ) {
		res.send( data );
		next();
	} ).error( function ( err ) {
		 res.send( err );
	} );
};

exports.getProducts = function ( req, res, next ) {

	Products.findAll( {
		'attributes' : [ 'ProductId', 'Name', 'Cost', 'Income', 'Profit', 'createdAt', 'updatedAt' ]
	} ).success( function ( data ) {
		res.send( data );
		next();
	} ).error( function ( err ) {
		 res.send( err );
	} );
};

exports.deleteProduct = function ( req, res, next ) {
	var item = { 'ProductId' : req.params.id };

	Products.find( { 'where' : item } ).success( function( data ) {
		data.destroy().success( function () {
			//res.send( 'deleted' );
			next();
		} ).error( function ( err ) {
		 res.send( err );
		} );

		next();
	} ).error( function ( err ) {
		 res.send( err );
	} );
};

/* make addtional research regarding deleteAll */
//exports.deleteAllProducts = function ( req, res, next ) {

	//Products.findAll().success( function( data ) {
		//data.destroy().success( function () {
			//res.send( 'all items deleted' );
			//next();
		//} ).error( function ( err ) {
		 //res.send( err );
		//} );

		//next();
	//} ).error( function ( err ) {
		 //res.send( err );
	//} );
//};

exports.updateProduct = function ( req, res, next ) {
	var filter = { 'id' : req.params.id };

	Products.find( { 'where' : filter } ).success( function( data ) {

		/* Code not working... TODO: PUT FUNCTION */
		//data[ req.params.update ] = req.params[ req.params.update ];

		//data.save().success( function () {
			//res.send( 'updated' );
			//next();
		//} ).error( next );

		next();
	} ).error( next );
};

module.exports = exports;
