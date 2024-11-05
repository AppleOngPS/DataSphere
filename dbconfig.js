module.exports = {
    user: "Datasphere", // Replace with your SQL Server login username
    password: "Testing123", // Replace with your SQL Server login password
    server: "localhost",
    database: "Datasphere", // Replace with your SQL Server database name
    trustServerCertificate: true,
    options: {
      port: 1433, // Default SQL Server port
      connectionTimeout: 60000, // Connection timeout in milliseconds
    },
  };