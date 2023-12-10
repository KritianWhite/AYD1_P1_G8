import {Router} from 'express';

import {libroController} from '../controllers/libroController';

class LibroRoutes{
    public router: Router = Router();
    
    constructor(){      
        this.config();
    }

    config(): void {
        this.router.get('/', libroController.ListaLibros);
        this.router.post('/publicar/:email', libroController.PublicarLibro);
        this.router.get('/eliminar/:email/:titulo', libroController.EliminarLibro);
        this.router.post('/editar/:email/:titulo/', libroController.EditarLibro);
        this.router.post('/rentar/:email/:titulo/', libroController.RentaLibro);
        this.router.get('/comprar/:email/:titulo/', libroController.ComprarLibro);

        
    }
}
const libroRoutes = new LibroRoutes();
export default libroRoutes.router;