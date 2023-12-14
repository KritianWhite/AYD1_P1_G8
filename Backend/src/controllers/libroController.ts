import {Request, Response} from 'express';
import pool from "../database";
import { corregirFormato } from '../utilidades';

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
                    res.json({message: "No se encontraron libros"}); // Enviar un JSON vacío 
                }
            });
        } catch (error) {
            //console.error('Error al obtener libros:', error);
            res.status(500).json({ message: 'Error al obtener libros' });
        }
    }

     //GET - libro por el titulo
     public async Libro(req: Request, res: Response): Promise<void> {
        try {
            const titulo = corregirFormato(req.params.titulo);
            // Realiza la consulta 
            pool.query('SELECT * FROM LIBRO WHERE titulo = ?',[titulo], (error, results) => {
                // Verifica si hay resultados
                if (results && results.length > 0) {
                    res.json(results[0]);
                } else {
                    res.json({message: "No se encontraron libros"}); // Enviar un JSON vacío 
                    //console.log("No se encontraron libros");
                }
            });
        } catch (error) {
            //console.error('Error al obtener el libro:', error);
            res.status(500).json({ message: 'Error al obtener el libro' });
        }
    }

    // post - publicar libro - verifica que sea admin 
    public async PublicarLibro(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
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
            const email  = corregirFormato(req.params.email);
            const titulo  = corregirFormato(req.params.titulo);
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
            const email  = corregirFormato(req.params.email);
            const titulo  = corregirFormato(req.params.titulo);
            pool.query('SELECT * FROM USUARIO WHERE email = ? AND administrador = 1', [email], (error, results) => {
                // Verifica si hay resultados 
                if (results.length > 0) {
                    pool.query('UPDATE LIBRO SET ? WHERE titulo = ? LIMIT 1;', [req.body,titulo]);
                    res.json({ message: 'Libro editado correctamente' });
                }
            });
        } catch (error) {
           // console.error('Error en el proceso de eliminacion del libro:', error);
            res.status(500).json({ message: 'Error en el proceso de actualziacion del libro' });
        }
    }

    // post - Rentar libro 
    public async RentaLibro(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            const titulo  = corregirFormato(req.params.titulo);
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
            //console.error('Error en rentar el libro:', error);
            res.status(500).json({ message: 'Error en rentar el libro' });
        }
    }

    // get - Comprar libro 
    public async ComprarLibro(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            const titulo  = corregirFormato(req.params.titulo);
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
            //console.error('Error en comprar el libro:', error);
            res.status(500).json({ message: 'Error en comprar el libro' });
        }
    }

     // get - Devolver libro 
     public async DevolverLibro(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            const titulo  = corregirFormato(req.params.titulo);
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
            //console.error('Error en devolver el libro:', error);
            res.status(500).json({ message: 'Error en devolver el libro' });
        }
    }

    // GET - todos los comentarios del libro
    public async ListaComentarios(req: Request, res: Response): Promise<void> {
        try {
            const titulo  = corregirFormato(req.params.titulo);
            // Realiza la consulta 
            pool.query(
                'SELECT U.nombre, C.comentario FROM proyecto1.COMENTARIO C INNER JOIN proyecto1.USUARIO U ON C.usuario = U.id_usuario INNER JOIN proyecto1.LIBRO L ON C.libro = L.id_libro WHERE L.titulo = ?',
                [titulo],(error, results) => {
                    // Verifica si hay resultados
                    if (results && results.length > 0) {
                        res.json(results);
                        //console.log("Comentarios del libro:", results);
                    } else {
                        res.json({message: "No se encontraron comentarios para el libro"}); 
                     //   console.log("");
                    }
                }
            );
        } catch (error) {
            //console.error('Error al obtener los comentarios del libro:', error);
            res.status(500).json({ message: 'Error al obtener los comentarios del libro' });
        }
    }

    // post - Escribir comentario a un libro 
    public async IngresarComentario(req: Request, res: Response): Promise<void> {
        try {
            const email = corregirFormato(req.params.email);
            const titulo = corregirFormato(req.params.titulo);
            const { comentario } = req.body;
            // Obtener id_usuario e id_libro
            pool.query('SELECT id_usuario, id_libro FROM USUARIO, LIBRO WHERE email = ? AND titulo = ?',
            [email, titulo], (error, results) => {
                // Verifica si hay resultados
                if (results.length > 0) {
                    const idUsuario = results[0].id_usuario;
                    const idLibro = results[0].id_libro;
                    // Insertar comentario
                    pool.query('INSERT INTO COMENTARIO (comentario, usuario, libro) VALUES (?, ?, ?)',
                        [comentario, idUsuario, idLibro], (insertError) => {
                            if (insertError) {
                                console.error('Error al insertar comentario:', insertError);
                                res.status(500).json({ message: 'Error al insertar comentario' });
                            } else {
                                res.json({ message: 'Comentario agregado' });
                            }
                        });
                } else {
                    res.status(404).json({ message: 'Usuario o libro no encontrado' });
                }
            });
        } catch (error) {
           // console.error('Error en ingresar comentario:', error);
            res.status(500).json({ message: 'Error en ingresar comentario' });
        }
    }

     // POST - Eliminar comentario -tiene que ser el autor del comentario
     public EliminarComentario(req: Request, res: Response): void {
        try {
            const email = corregirFormato(req.params.email);
            const titulo = corregirFormato(req.params.titulo);
            const { comentario } = req.body;
    
            pool.query(`
                DELETE FROM proyecto1.COMENTARIO
                WHERE comentario = ? AND usuario = (
                    SELECT id_usuario
                    FROM proyecto1.USUARIO
                    WHERE email = ?
                ) AND libro = (
                    SELECT id_libro
                    FROM proyecto1.LIBRO
                    WHERE titulo = ?
                )`,
                [comentario, email, titulo],
                (error) => {
                    if (error) {
                       // console.error('Error al eliminar el comentario:', error);
                        res.status(500).json({ message: 'Error al eliminar el comentario' });
                    } else {
                        res.status(200).json({ message: 'Comentario eliminado exitosamente' });
                    }
                }
            );
        } catch (error) {
            //console.error('Error general al eliminar el comentario:', error);
            res.status(500).json({ message: 'Error general al eliminar el comentario' });
        }
    }
    
    

}

export const libroController = new LibroController();