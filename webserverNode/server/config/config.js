// ############# PORT CONFIGURATION
process.env.PORT = process.env.PORT || 3000;

// ########## Enviroments
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ###########  BD Config

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffe';
} else {
    urlDB = 'mongodb+srv://rabin:Xa15L3bT1LfWkH0X@clustercoffedb-r82zt.gcp.mongodb.net/coffe';
}

process.env.URLDB = urlDB;