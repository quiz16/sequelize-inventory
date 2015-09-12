var Users = require( '../model/Users' );

exports.createUser = function ( req, res, next ) {
	var filter = {
		'name'     : 'Reynald Jo Armonia',
		'isadmin'  : true,
		'email'    : 'quiz16',
		'password' : 'testfoo'
	};
	Users.create( filter ).success( function( data ) {
		res.send( data );
		next();
	} ).error( next );
};

exports.updateUser = function ( req, res, next ) {
	var filter = { 'id' : req.params.id };

	Users.find( { 'where' : filter } ).success( function( data ) {

		data[ req.params.update ] = req.params[ req.params.update ];

		data.save().success( function () {
			res.send( 'updated' );
			next();
		} ).error( next );

		next();
	} ).error( next );
};

exports.deleteUser = function ( req, res, next ) {
	var filter = { 'id' : req.params.id };

	Users.find( { 'where' : filter } ).success( function( data ) {
		data.destroy().success( function () {
			res.send( 'deleted' );
			next();
		} ).error( next );

		next();
	} ).error( next );
};

exports.getUser = function ( req, res, next  ) {
	var filter = { 'username' : req.params.username };

	Users.find( { 'where' : filter } ).success( function ( data ) {
		data =  ( data) ? data : { };
		  res.send( data );

		next();
	} ).error( next );
};

exports.getUsers = function ( req, res, next ) {
	Users.findAll().success( function ( data ) {
		res.send( data );
		next();
	} ).error( next );
};

exports.searchUser = function ( req, res, next ) {
	var filter = {
		'username' : {
			'like'  : '%' + req.params.username + '%'
		}
	};

	Users.findAll( { 'where' : filter , 'order' : 'username ASC' } ).success( function ( data ) {
		res.send( data );
		next();
	} ).error( next );
};

exports.queryLogin = function ( req, res, next ) {
	var filter = {
		'username' : {
			'like'  : '%' + req.params.username + '%'
		},
		'password' : {
			'like'  :  req.params.password
		}
	};

	Users.findAll( { 'where' : filter , 'order' : 'username ASC' } ).success( function ( data ) {

		Users.find( { 'where' : { 'id' : data[ 0 ].dataValues.id } } ).success( function( data ) {
			var d       = new Date();
			var month   = d.getMonth() + 1;
			var hours   = d.getHours();
			var minutes = d.getMinutes();
			var ampm    = hours >= 12 ? 'pm' : 'am';
			hours       = hours % 12;
			hours       = hours ? hours : 12; // the hour '0' should be '12'
			minutes     = minutes < 10 ? '0'+minutes : minutes;
			var strTime = hours + ':' + minutes + ' ' + ampm;

    		data.last_login = 'Date: ' + d.getDate() + '-' + month + '-' + d.getFullYear()+ ' Time: ' + strTime;
			data.save().success( function () {
				res.send( 'updated' );
				next();
			} ).error( next );

			next();
		} ).error( next );
		res.send( data );
		next();
	} ).error( next );
	/*Users.find( { 'where' : filterId } ).success( function( data ) {
		data.last_login = new Date();
		data.save().success( function () {
			res.send( 'updated' );
			next();
		} ).error( next );

		next();
	} ).error( next );*/
};

module.exports = exports;
