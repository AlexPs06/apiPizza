const mysql = require( 'mysql' );
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    async  query( sql, args ) {
        return await new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    async close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
module.exports.Database = Database;