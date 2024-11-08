import { pool } from "./db.js";
export const register = async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const query = "INSERT INTO usuarios (username, email, password) VALUES ($1, $2, $3)";
            const values = [username, email, password];
    
            await pool.query(query, values);
            res.json({ message: "Datos guardados exitosamente" });
            console.log("usuario guardado")
            
        } catch (error) {
            console.error("Error al guardar en la base de datos:", error);
            res.status(500).json({ error: "Error al guardar los datos" });
        };
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = "SELECT * FROM usuarios WHERE username = $1 AND password = $2";
        const values = [username, password];

        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.json({ success: true, message: "Inicio de sesión exitoso" });
        } else {
            res.status(401).json({ success: false, message: "username o contraseña incorrectos" });
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
    console.log("Sesion iniciada")

};

export const methods = {
    login,
    register,
};
