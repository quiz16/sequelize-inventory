'use stric';

var Sequelize = require( 'sequelize' );

var sequelize = require( 'sequelize' ).LOCAL;

var Products = sequelize.define( 'Products', {
	'ProductId' : {
		'type'         : Sequelize.UUID,
		'primaryKey'   : true,
		'defaultValue' : Sequelize.UUIDV4
	},
	'Name' : {
		'type'      : Sequelize.STRING,
		'allowNull' : false,
		'validate' : {
			'notNull' : {
				'msg' : 'not allowed to be null'
			},
			'notEmpty' : {
				'msg' : 'not allowed to be empty'
			},
			'isUppercaseFirst' : function ( value ) {
				if ( value.charAt( 0 ) !== value.charAt( 0 ).toUpperCase() ) {
					throw new Error( 'first letter must be Upper Case' );
				}
			}
		}
	},
	'Cost' : {
		'type'      : Sequelize.FLOAT,
		'allowNull' : false,
		'validate' : {
			'notNull' : {
				'msg' : 'not allowed to be null'
			},
			'isNumeric' : {
				'msg' : 'must be number'
			}
		}
	},
	'Income' : {
		'type'      : Sequelize.FLOAT,
		'allowNull' : false,
		'validate' : {
			'notNull' : {
				'msg' : 'not allowed to be null'
			},
			'isNumeric' : {
				'msg' : 'must be number'
			}

		}
	},
	'Profit' : {
		'type'      : Sequelize.FLOAT,
		'allowNull' : false,
		'validate' : {
			'notNull' : {
				'msg' : 'not allowed to be null'
			},
			'isNumeric' : {
				'msg' : 'must be number'
			}

		}
	}
},
{
	'timeStamps' : true,
	'paranoid'   : true,
	'deletedAt'  : 'Deleted_at'
} );

module.exports = Products;
