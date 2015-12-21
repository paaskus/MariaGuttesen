var mongodb = {
    CONNECTION_PREFIX: "mongodb://",
    DATABASE_USERNAME: "",
    DATABASE_PASSWORD: "",
    DATABASE_HOST: "localhost",
    DATABASE_PORT: 27017,
    DATABASE_NAME: "MGDB"
};

module.exports = Object.freeze({
    server: {
        PORT: 3000,
        HOST: "localhost"
    },
    mongodb: mongodb,
    DATABASE_URI: mongodb.CONNECTION_PREFIX+mongodb.DATABASE_HOST+":"+mongodb.DATABASE_PORT+"/"+mongodb.DATABASE_NAME
});