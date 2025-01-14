module.exports = {
    database: {
        master: {
            host: "localhost",
            user: "root",
            password: "123",
            port: "3306",
            database: "family_tree",
            connectionLimit: 3
        },
        slave: {
            host: "localhost",
            user: "root",
            password: "123",
            port: "3306",
            database: "family_tree",
            connectionLimit: 3
        }
    }
};
