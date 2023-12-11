import {Request, Response} from 'express';
import pool from "../database";

class LibroController{
    
    //GET - todos los libro libre
    public async ListaLibros(req: Request, res: Response): Promise<void> {
        try {
            // Realiza la consulta 
            pool.query('SELECT * FROM LIBRO WHERE estado = \'libre\'', (error, results) => {
                // Verifica si hay resultados
                if (results && results.length > 0) {
                    res.json(results);
                    //console.log("libros:", results);
                } else {
                    res.json({message: "No se encuentran libros"}); // Enviar un JSON vacío 
                    //console.log("No se encontraron libros");
                }
            });
        } catch (error) {
            //console.error('Error al obtener libros:', error);
            res.status(500).json({ message: 'Error al obtener libros' });
        }
    }

    // post - publicar libro - verifica que sea admin 
    public async PublicarLibro(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.params;
            pool.query('SELECT * FROM USUARIO WHERE email = ? AND administrador = 1', [email], (error, results) => {
                // Verifica si hay resultados 
                if (results.length > 0) {
                    pool.query('INSERT INTO LIBRO SET ?', [req.body]);
                    res.json({ message: 'Libro publicado' });
                }
            });
        } catch (error) {
            //console.error('Error en el proceso de publicacion del libro:', error);
            res.status(500).json({ message: 'Error en el proceso de publicacion del libro' });
        }
    }

    // get - Eliminar libro - verifica que sea admin 
    public async EliminarLibro(req: Request, res: Response): Promise<void> {
        try {
            const { email, titulo } = req.params;
            pool.query('SELECT * FROM USUARIO WHERE email = ? AND administrador = 1', [email], (error, results) => {
                // Verifica si hay resultados 
                if (results.length > 0) {
                    pool.query('DELETE FROM LIBRO WHERE titulo = ? LIMIT 1', [titulo]);
                    res.json({ message: 'Libro eliminado' });
                }
            });
        } catch (error) {
            //console.error('Error en el proceso de eliminacion del libro:', error);
            res.status(500).json({ message: 'Error en el proceso de eliminacion del libro' });
        }
    }

    // post - Editar libro - verifica que sea admin 
    public async EditarLibro(req: Request, res: Response): Promise<void> {
        try {
            const { email, titulo } = req.params;
            const { tituloEditar } = req.body.titulo;
            pool.query('SELECT * FROM USUARIO WHERE email = ? AND administrador = 1', [email], (error, results) => {
                // Verifica si hay resultados 
                if (results.length > 0) {
                    pool.query('UPDATE LIBRO SET ? WHERE titulo = ? LIMIT 1;', [titulo,tituloEditar]);
                    res.json({ message: 'Libro eliminado' });
                }
            });
        } catch (error) {
            console.error('Error en el proceso de eliminacion del libro:', error);
            res.status(500).json({ message: 'Error en el proceso de eliminacion del libro' });
        }
    }

    // post - Rentar libro 
    public async RentaLibro(req: Request, res: Response): Promise<void> {
        try {
            const { email, titulo } = req.params;
            const { fecha_devolucion } = req.body.fecha_devolucion;
            var idUsuario,idLibro;
            // Obtener id_usuario e id_libro
            pool.query('SELECT id_usuario, id_libro FROM USUARIO, LIBRO WHERE email = ? AND titulo = ?',
            [email, titulo], (error, results) => {
                // Verifica si hay resultados 
                if (!(results.length == 0)) {
                    idUsuario = results[0].id_usuario;
                    idLibro = results[0].id_libro;
                }else {
                    res.status(404).json({ message: 'Usuario o libro no encontrado' });
                    return;
                }
            });
            //insertar renta
            pool.query('INSERT INTO RENTA (fecha_devolucion, usuario, libro) VALUES (?, ?, ?)',[fecha_devolucion, idUsuario, idLibro]);
             // Actualizar estado en la tabla LIBRO
            pool.query('UPDATE LIBRO SET estado = ? WHERE id_libro = ?',['rentado', idLibro]);
            // Insertar en la tabla HISTORIAL
            pool.query('INSERT INTO HISTORIAL (descripcion, usuario) VALUES (?, ?)',[`Libro '${titulo}' rentado`, idUsuario]);
            res.json({ message: 'Libro rentado' });
            } catch (error) {
            console.error('Error en rentar el libro:', error);
            res.status(500).json({ message: 'Error en rentar el libro' });
        }
    }

    // get - Comprar libro 
    public async ComprarLibro(req: Request, res: Response): Promise<void> {
        try {
            const { email, titulo } = req.params;
            var idUsuario,idLibro;
            // Obtener id_usuario e id_libro
            pool.query('SELECT id_usuario, id_libro FROM USUARIO, LIBRO WHERE email = ? AND titulo = ?',
            [email, titulo], (error, results) => {
                // Verifica si hay resultados 
                if (!(results.length == 0)) {
                    idUsuario = results[0].id_usuario;
                    idLibro = results[0].id_libro;
                }else {
                    res.status(404).json({ message: 'Usuario o libro no encontrado' });
                    return;
                }
            });
             // Actualizar estado en la tabla LIBRO
            pool.query('UPDATE LIBRO SET estado = ? WHERE id_libro = ?',['vendido', idLibro]);
            // Insertar en la tabla HISTORIAL
            pool.query('INSERT INTO HISTORIAL (descripcion, usuario) VALUES (?, ?)',[`Libro '${titulo}' comprado`, idUsuario]);
            res.json({ message: 'Libro comprado' });
            } catch (error) {
            console.error('Error en comprar el libro:', error);
            res.status(500).json({ message: 'Error en comprar el libro' });
        }
    }

     // get - Devolver libro 
     public async DevolverLibro(req: Request, res: Response): Promise<void> {
        try {
            const { email, titulo } = req.params;
            var idUsuario,idLibro;
            // Obtener id_usuario e id_libro
            pool.query('SELECT id_usuario, id_libro FROM USUARIO, LIBRO WHERE email = ? AND titulo = ?',
            [email, titulo], (error, results) => {
                // Verifica si hay resultados 
                if (!(results.length == 0)) {
                    idUsuario = results[0].id_usuario;
                    idLibro = results[0].id_libro;
                }else {
                    res.status(404).json({ message: 'Usuario o libro no encontrado' });
                    return;
                }
            });
             // Actualizar estado en la tabla LIBRO
            pool.query('UPDATE LIBRO SET estado = ? WHERE id_libro = ?',['libre', idLibro]);
            // Insertar en la tabla HISTORIAL
            pool.query('INSERT INTO HISTORIAL (descripcion, usuario) VALUES (?, ?)',[`Libro '${titulo}' devuelto`, idUsuario]);
            res.json({ message: 'Libro devuelto' });
            } catch (error) {
            console.error('Error en devolver el libro:', error);
            res.status(500).json({ message: 'Error en devolver el libro' });
        }
    }

    // GET - todos los comentarios del libro
    public async ListaComentarios(req: Request, res: Response): Promise<void> {
        try {
            const { titulo } = req.params;
            // Realiza la consulta 
            pool.query(
                'SELECT COMENTARIO.* FROM COMENTARIO JOIN LIBRO ON COMENTARIO.libro = LIBRO.id_libro WHERE LIBRO.titulo = ?',
                [titulo],(error, results) => {
                    // Verifica si hay resultados
                    if (results && results.length > 0) {
                        res.json(results);
                        console.log("Comentarios del libro:", results);
                    } else {
                        res.json({}); // Enviar un JSON vacío 
                        console.log("No se encontraron comentarios para el libro");
                    }
                }
            );
        } catch (error) {
            console.error('Error al obtener los comentarios del libro:', error);
            res.status(500).json({ message: 'Error al obtener los comentarios del libro' });
        }
    }

    // post - Escribir comentario a un libro 
    public async IngresarComentario(req: Request, res: Response): Promise<void> {
        try {
            const { email, titulo } = req.params;
            const { comentario } = req.body.comentario;
            var idUsuario,idLibro;
            // Obtener id_usuario e id_libro
            pool.query('SELECT id_usuario, id_libro FROM USUARIO, LIBRO WHERE email = ? AND titulo = ?',
            [email, titulo], (error, results) => {
                // Verifica si hay resultados 
                if (!(results.length == 0)) {
                    idUsuario = results[0].id_usuario;
                    idLibro = results[0].id_libro;
                }else {
                    res.status(404).json({ message: 'Usuario o libro no encontrado' });
                    return;
                }
            });
            // Insertar comentario
            pool.query('INSERT INTO COMENTARIO (comentario, usuario, libro) VALUES (?, ?, ?)',
            [comentario, idUsuario, idLibro], (insertError) => {
                res.json({ message: 'Comentario agregado' })
            });
            
        } catch (error) {
            console.error('Error en rentar el libro:', error);
            res.status(500).json({ message: 'Error en rentar el libro' });
        }
    }

     // POST - Eliminar comentario -tiene que ser el autor del comentario
    public EliminarComentario(req: Request, res: Response): void {
        try {
            const { email } = req.params;
            const { comentarioId } = req.body;

            // Obtener id_usuario del usuario que realiza la solicitud
            pool.query('SELECT id_usuario FROM USUARIO WHERE email = ?', [email], (error, results) => {

                if (results.length === 0) {
                    res.status(404).json({ message: 'Usuario no encontrado' });
                    return;
                }
                const idUsuarioSolicitante = results[0].id_usuario;
                // Verificar si el usuario es el autor del comentario
                pool.query('SELECT id_usuario FROM COMENTARIO WHERE id_comentario = ?', [comentarioId], (error, results) => {
                    if (results.length === 0) {
                        res.status(404).json({ message: 'Comentario no encontrado' });
                        return;
                    }
                    const idUsuarioAutor = results[0].id_usuario;
                    if (idUsuarioSolicitante !== idUsuarioAutor) {
                        res.status(403).json({ message: 'No tienes permiso para eliminar este comentario' });
                        return;
                    }
                    // Eliminar el comentario
                    pool.query('DELETE FROM COMENTARIO WHERE id_comentario = ? LIMIT 1', [comentarioId], (error) => {
                        res.status(200).json({ message: 'Comentario eliminado exitosamente' });
                    });
                });
            });
        } catch (error) {
            console.error('Error general al eliminar el comentario:', error);
            res.status(500).json({ message: 'Error general al eliminar el comentario' });
        }
    }



    

}

export const libroController = new LibroController();