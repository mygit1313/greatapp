const { createPool } = require('mysql');
const pool = createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
});

const excuteQuery = (query, arraParams) => {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log('Error while connecting db', err)
                } else {
                    //console.log("Database connected...");
                    connection.query(query, arraParams, (err, data) => {
                        if (err) {
                            console.log("Error in executing the query", err);
                            reject(err);
                        }
                        connection.release();
                        resolve(data)
                    })
                }


            })
        } catch (error) {
            reject(error)
        }
    })

}

module.exports = { excuteQuery };