//Hacemos referencia a la libreria de mysql
const mysql = require('mysql');
//Configuración de la informacion de base de datos
const configDB = {
  host: 'curso-sls-rds-mysql.c2pnb5jhu7by.us-east-1.rds.amazonaws.com',
  user: 'curso_sls',
  password: 'secret123',
  port: '3306',
  database: 'curso_sls',
  debug: true
};

//Con esta funcion conectamos a mysql la inicializamos sin perderla
function initializeConnection(config) {
  function addDisconnectHandler(connection) {
    connection.on("error", function (error) {
      if (error instanceof Error) {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          console.error(error.stack);
          console.log("Lost connection. Reconnecting...");

          initializeConnection(connection.config);
        } else if (error.fatal) {
          throw error;
        }
      }
    });
  }
  
  const connection = mysql.createConnection(config);

  // Add handlers.
  addDisconnectHandler(connection);

  connection.connect();
  return connection;
}

const connection = initializeConnection(configDB);

module.exports = connection;
