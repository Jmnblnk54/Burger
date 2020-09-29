// Import MySQL connection.
const connection = require("../config/connection");

function createQmarks(num) {
    let arr = [];
    for(var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function translateSql(obj) {
    let arr = [];
    for (let key in obj) {
        let value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'" ;
            }
            arr.push(key + "=" + value)
        }
    }
    return arr.toString();
}

const orm = {
    selectAll: function(table, cb){
        let dbQuery = "SELECT * FROM " + table + ";";

        connection.query(dbQuery, function(err, res){
            if(err) {
                throw err;
            }
            cb(res);
        })
    },
    insertOne: function(table, cols, vals, cb) {
        let dbQuery = "INSERT INTO " + table + " (" + cols.toString() + ") " + "VALUES (" + createQmarks(vals.length) + ") ";
        console.log(dbQuery);
        connection.query(dbQuery, vals, function(err, res){
            if(err) {
                throw err;
            }
            cb(res);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        let dbQuery = "UPDATE " + table + " SET " + translateSql(objColVals) + " WHERE " + condition;
        console.log(dbQuery);
        connection.query(dbQuery, function(err, res){
            if(err) {
                throw err;
            }
            cb(res);
        });
    },
   

}; 

module.exports = orm;