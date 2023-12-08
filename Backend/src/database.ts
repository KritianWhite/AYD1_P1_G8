import mysql, { Pool, PoolConnection } from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.then((poolInstance) => {
    return poolInstance.getConnection() as Promise<PoolConnection>;
  })
  .then((connection) => {
    console.log('Base de Datos Proyecto CONECTADA'); 
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

export default pool;
