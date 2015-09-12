var Sequelize = require( 'sequelize' );

var sequelize = require( 'sequelize' ).LOCAL;

var Users = sequelize.define( 'users', {
	'id' : {
		'type'         : Sequelize.UUID,
		'primaryKey'   : true,
		'defaultValue' : Sequelize.UUIDV4
	},
  	'name' : {
		'type'      : Sequelize.STRING,
		'allowNull' : false
	},
	'isadmin' : {
		'type'      : Sequelize.BOOLEAN,
		'allowNull' : false
	},
	'email' : {
		'type'      : Sequelize.STRING,
		'allowNull' : false
	},
	'password' : {
		'type'      : Sequelize.TEXT,
		'allowNull' : false
	}
} );

module.exports = Users;
