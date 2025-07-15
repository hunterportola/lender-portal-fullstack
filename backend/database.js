// backend/database.js
const { DocumentStore } = require('ravendb');

// Define the database server URL and the name of the database
const url = 'http://127.0.0.1:8080';
const dbName = 'BorrowerPortal';

// Create a new DocumentStore instance
const store = new DocumentStore(url, dbName);

// Initialize the store
store.initialize();

console.log('RavenDB Document Store initialized.');

// Export the store to be used by other parts of the application
module.exports = store;