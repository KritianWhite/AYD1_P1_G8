import {Router} from 'express';

import {usuariosController} from '../controllers/usuariosController';

class UsuariosRoutes{
    public router: Router = Router();
    
    constructor(){      
        this.config();
    }

    config(): void {
        this.router.get('/', usuariosController.ListarUsuarios); // obtiene la lista de todos los usuarios
        this.router.get('/verperfil/:email', usuariosController.VerPerfil); // obtiene al usuario
        this.router.post('/registrar',usuariosController.RegistrarUsuario); //registra un nuevo usuario
        this.router.post('/login/:email',usuariosController.Login); //login
        this.router.put('/cambiarPass/:email',usuariosController.CambiarPass); //actualiza la contraseña del email
        this.router.put('/modificarDatos/:email',usuariosController.ModificarDatos); //actualizar los datos del usuario
        this.router.get('/historial/:email',usuariosController.Historial); //obtiene todo el historial del usuario
        this.router.get('/librosrentados/:email',usuariosController.LibrosRentados); //Obtinene todo los libros que tiene rentado

    }
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;