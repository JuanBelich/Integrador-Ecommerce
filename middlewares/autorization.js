import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config()
const secretKey = "key";

async function soloAdmin(req, res, next) {
    const logeado = revisarCookie(req)
    if (logeado) {
        return next()
    }
    return res.redirect("profile");


}

function revisarCookie(req) {
    try {
        // Divide las cookies y busca la que comienza con "jwt="
        const cookieJWT = req.headers.cookie
            .split("; ")
            .find(cookie => cookie.startsWith("JWT="))
        const token = cookieJWT.slice(4)
        // console.log(token)

        const decodificada = jsonwebtoken.verify(token, secretKey)
        const comprobarUsuario = usuarios.find(usuario => usuario.user === decodificada.userId);
        console.log("login correcto")
        if (!comprobarUsuario) {
            return false
        }
        return true
    }
    catch {
        return false
    }

}
export const methods = {
    soloAdmin
}