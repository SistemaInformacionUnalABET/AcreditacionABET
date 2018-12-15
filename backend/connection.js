var mysql = require("mysql");

function Connection() {
    this.pool = null;

    this.start = function(){ 
    this.pool = mysql.createPool({
        connectionLimit: 10,
        host: 'mysql4.gear.host',        
        user: 'acreditacion',
        password: 'Ro1v423?e~v9',
        database: 'acreditacion'
    }) 
}

    
    this.obtain = function (callback) {
        this.pool.getConnection(function(error, connection){
            callback(error, connection)
            
        })
        
    }
}
module.exports = new Connection();
