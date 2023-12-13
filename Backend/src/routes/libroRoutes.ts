import {Router} from 'express';

import {libroController} from '../controllers/libroController';

class LibroRoutes{
    public router: Router = Router();
    
    constructor(){      
        this.config();
    }

    config(): void {
        this.router.get('/', libroController.ListaLibros); //retorna todos los libros 
        this.router.get('/:titulo', libroController.Libro); //retorna el libros por el titulo
        this.router.post('/publicar/:email', libroController.PublicarLibro); //inserta un libro nuevo
        this.router.get('/eliminar/:email/:titulo', libroController.EliminarLibro); //eliminar un libro por el titulo
        this.router.post('/editar/:email/:titulo/', libroController.EditarLibro); //edita un libro por su titulo 
        this.router.post('/rentar/:email/:titulo/', libroController.RentaLibro); //usuario renta un libro
        this.router.get('/comprar/:email/:titulo/', libroController.ComprarLibro); //ususario compra un libro
        this.router.get('/devolver/:email/:titulo/', libroController.DevolverLibro); //ususario devuelve un libro
        this.router.get('/comentarios/:titulo/', libroController.ListaComentarios); //retorna todos los comentarios del libro
        this.router.post('/escribirComentario/:email/:titulo/', libroController.IngresarComentario); //escribe un comentario al libro
        this.router.post('/eliminarComentario/:email/:titulo/', libroController.EliminarComentario); //elimina un comentario al libro
        
    }
}
const libroRoutes = new LibroRoutes();
export default libroRoutes.router;