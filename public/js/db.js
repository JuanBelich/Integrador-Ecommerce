import pg from "pg"; // IMPORTACION COMMONJS  ---- SOLUCION "IS A COMMON JS MODULE" 
//LA IMPORTACION CON LLAVES PERTENECE A ECMASCRIPT

export const pool = new pg.Pool({ //IMPORTACION COMMON JS

    port: 5432,
    host: "localhost",
    user: "postgres",
    password: "admin",
    database: "fragranze",
});

pool.on("connect", () => {
    console.log("Conectado a la base de datos");
});

// Puerto : 5432
// Usuario: postgres 
