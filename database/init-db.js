import { query } from './connection.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const initializeDatabase = async () => {
  try {
    console.log('🔄 Inicializando base de datos...');
    
    // Leer el archivo SQL
    const sqlFile = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    // Dividir las consultas por punto y coma
    const queries = sql.split(';').filter(query => query.trim() !== '');
    
    // Ejecutar cada consulta
    for (const sqlQuery of queries) {
      if (sqlQuery.trim()) {
        await query(sqlQuery);
        console.log('✅ Query ejecutada:', sqlQuery.trim().substring(0, 50) + '...');
      }
    }
    
    console.log('✅ Base de datos inicializada correctamente');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    throw error;
  }
};

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
