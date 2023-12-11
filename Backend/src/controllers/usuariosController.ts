import {Request, Response} from 'express';
import pool from "../database";
import { corregirFormato } from '../utilidades';

class UsuariosController{
    //GET - Devuelve la lista de todos los usuarios
    public async ListarUsuarios(req: Request, res: Response): Promise<void> {
        try {
            // Realiza la consulta 
            pool.query('SELECT * FROM USUARIO', (error, results) => {
                // Verifica si hay resultados
                if (results && results.length > 0) {
                    res.json(results);
                    console.log("usuarios:", results);
                } else {
                    res.json({}); // Enviar un JSON vacío 
                    console.log("No se encontraron usuarios");
                }
            });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    }

    // Post - Login
    public async Login(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            const { password } = req.body;
            // Realiza la consulta 
            pool.query('SELECT * FROM USUARIO WHERE email = ? AND passwordd = ?', [email, password], (error, results) => {
                // Verifica si hay resultados en el array devuelto
                if (results && results.length > 0) {
                    res.json(results[0]);
                    const email = results[0].email;
                    const pass = results[0].passwordd;
                } else {
                    res.status(401).json({ message: 'Usuario o Contraseña Incorrectos' }); // Cambiado a 401 Unauthorized
                }
            });
        } catch (error) {
            console.error('Error en el proceso de inicio de sesión:', error);
            res.status(500).json({ message: 'Error en el proceso de inicio de sesión' });
        }
    }

    // post - registrar usuario
    public async RegistrarUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body.email;
            pool.query('SELECT * FROM USUARIO WHERE email = ? ', [email], (error, results) => {
                // Verifica si no hay resultados 
                if (!(results.length > 0)) {
                    pool.query('INSERT INTO USUARIO SET ?', [req.body]);
                    res.json({ message: 'Usuario Creado' });
                }
            });
        } catch (error) {
            console.error('Error en el proceso de registro de usuario:', error);
            res.status(500).json({ message: 'Error en el proceso de registro de usuario' });
        }
    }


    // get - ver perfil del usuario
    public async VerPerfil(req: Request, res: Response): Promise<void>{
        try {
            const email  = corregirFormato(req.params.email);
            // Realiza la consulta 
            pool.query('SELECT * FROM USUARIO WHERE email = ?',[email], (error, results) => {
                // Verifica si hay resultados
                if (results.length > 0) {
                    res.json(results[0]);
                }
            });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }

    }
    
    // put - Cambia la contraseña del usuario indicado
    public async CambiarPass(req: Request, res: Response):Promise<void>{
        try{
            const email  = corregirFormato(req.params.email);
            pool.query('UPDATE USUARIO SET passwordd = ? WHERE email = ?', [req.body.password, email]);
            res.json({message: 'Contraseña Actualizada'});    
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ message: 'Error al actualizar usuario' });
        }
    }
    
    
    public async ModificarDatos(req: Request,res: Response):Promise<void>{
        try{
            const email  = corregirFormato(req.params.email);
            pool.query('UPDATE USUARIO SET ? WHERE email = ?',[req.body, email]);
            res.json({message: 'Datos Actualizados'});
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ message: 'Error al actualizar usuario' });
        }
    }
    
    //GET - Devuelve la lista de descripcion del historial del usuario
    public async Historial(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            // Realiza la consulta 
            pool.query(
            'SELECT h.* FROM HISTORIAL h JOIN USUARIO u ON h.usuario = u.id_usuario WHERE u.email = ?',
            [email],
            (error, results) => {
            // Verifica si hay resultados
                if (results && results.length > 0) {
                    res.json(results);
                    console.log("historial:", results);
                } else {
                    res.json({}); // Enviar un JSON vacío 
                    console.log("No se encontraron usuarios");
                }
            });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    }

}

export const usuariosController = new UsuariosController();