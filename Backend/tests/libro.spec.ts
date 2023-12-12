import supertest from 'supertest';
import app from '../src/index';
//import { describe } from 'node:test';

describe('GET - Libro', () => {
    test('Retornar todos los libros libres', async () => {
        const response = await supertest(app).get('/libro');
        expect(response.status).toBe(200);
        expect(response.body.message).not.toBe('No se encuentran libros');
    });

    test('Obtener un libro por su titulo', async () => {
        const email = 'prueba@gmail.com';
        const titulo = 'Prueba';
        const response = await supertest(app).get(`/libro/${encodeURIComponent(titulo)}`);
        expect(response.status).toBe(200);
        expect(response.body.message).not.toBe('No se encontraron libros');
    });

    test('Eliminar un libro por su titulo', async () => {
        const email = 'prueba@gmail.com';
        const titulo = 'Prueba2';
        const response = await supertest(app).get(`/libro/eliminar/${encodeURIComponent(email)}/${encodeURIComponent(titulo)}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Libro eliminado');
    });

    test('Compra de libros por un usuario', async () => {
        const email = 'prueba@gmail.com';
        const titulo = 'Prueba';
        const response = await supertest(app).get(`/libro/comprar/${encodeURIComponent(email)}/${encodeURIComponent(titulo)}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Libro comprado');
    });

    test('Usuario devuelve el libro', async () => {
        const email = 'prueba@gmail.com';
        const titulo = 'Prueba';
        const response = await supertest(app).get(`/libro/devolver/${encodeURIComponent(email)}/${encodeURIComponent(titulo)}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Libro devuelto');
    });

    test('Retornar todos los comentarios del libro', async () => {
        const email = 'prueba@gmail.com';
        const titulo = 'Prueba';
        const response = await supertest(app).get(`/libro/comentarios/${encodeURIComponent(titulo)}`);
        expect(response.status).toBe(200);
        expect(response.body.message).not.toBe('Error al obtener los comentarios del libro');
    });


    
});





describe('GET - Usuario', () => {
    test('Obtiene la lista de todos los usuarios', async () => {
        const response = await supertest(app).get('/usuario');
        expect(response.status).toBe(200);
        expect(response.body.message).not.toBe('No se encontraron usuarios');
    });

    test('Obtiene datos de un unico usuario', async () => {
        const email = 'prueba@gmail.com';
        const titulo = 'Prueba';
        const response = await supertest(app).get(`/usuario/verperfil/${encodeURIComponent(email)}`);
        expect(response.status).toBe(200);
        expect(response.body.message).not.toBe('Error al obtener usuarios');
    });
});

describe('POST - Libro', () => {
    test('Inserta un libro nuevo', async () => {
        const email = 'prueba@gmail.com';
        const datosLibro = {
            titulo: 'Libro de Prueba',
            sinopsis: 'Una breve descripción del libro de prueba.',
            precio_compra: 20.99,
            precio_venta: 29.99,
            autor: 'Autor de Prueba',
            anio_publicacion: 2022,
            editorial: 'Editorial de Prueba',
            estado: 'libre',
            fecha_devolucion: new Date().toISOString().split('T')[0], // Fecha de hoy en formato MySQL
        };

        const response = await supertest(app)
            .post(`/libro/publicar/${encodeURIComponent(email)}`)
            .send(datosLibro);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Libro publicado');
        //expect(response.body.data).toBeDefined(); // Puedes ajustar según la estructura de tu respuesta
    });

    test('Editar un libro por su titulo', async () => {
        const email = 'prueba@gmail.com';
        const datosLibro = {
            titulo: 'Edicion de libro',
            sinopsis: 'Una breve descripción del libro de prueba.',
            precio_compra: 20.99,
            precio_venta: 29.99,
            autor: 'Autor de Prueba',
            anio_publicacion: 2022,
            editorial: 'Editorial de Prueba',
            estado: 'libre',
            fecha_devolucion: new Date().toISOString().split('T')[0], // Fecha de hoy en formato MySQL
        };
        const titulo = 'Libro de Prueba';

        const response = await supertest(app)
            .post(`/libro/editar/${encodeURIComponent(email)}/${encodeURIComponent(titulo)}`)
            .send(datosLibro);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Libro editado correctamente');
        //expect(response.body.data).toBeDefined(); // Puedes ajustar según la estructura de tu respuesta
    });

    test('Usuario renta un libro', async () => {
        const email = 'prueba@gmail.com';
        const datosLibro = {
            fecha_devolucion: "2024-10-10"
        };
        const titulo = 'Libro de Prueba';

        const response = await supertest(app)
            .post(`/libro/rentar/${encodeURIComponent(email)}/${encodeURIComponent(titulo)}`)
            .send(datosLibro);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Libro rentado');
        //expect(response.body.data).toBeDefined(); // Puedes ajustar según la estructura de tu respuesta
    });

    test('Escribir un comentario a un libro', async () => {
        const email = 'prueba@gmail.com';
        const datosLibro = {
            comentario: "buen libro de prueba"
        };
        const titulo = 'Prueba';

        const response = await supertest(app)
            .post(`/libro/escribirComentario/${encodeURIComponent(email)}/${encodeURIComponent(titulo)}`)
            .send(datosLibro);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Comentario agregado');
        //expect(response.body.data).toBeDefined(); // Puedes ajustar según la estructura de tu respuesta
    });
});

describe('POST - Usuario', () => {
    test('Inserta un libro nuevo', async () => {
        const email = 'prueba@gmail.com';
        const datosUsuario = {
            nombre: 'Nombre de Prueba',
            apellido: 'Apellido de Prueba',
            telefono: 45678932,
            email: "nuevodato@gmail.com",
            passwordd: 'contrasena',
            fecha_nacimiento: "2004-01-01",
            administrador: 1,
        };

        const response = await supertest(app)
            .post(`/usuario/registrar`)
            .send(datosUsuario);

        console.log(response.body);    

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Usuario Creado');
        //expect(response.body.data).toBeDefined(); // Puedes ajustar según la estructura de tu respuesta
    });


    test('Login del usuario', async () => {
        const email = 'prueba@gmail.com';
        const datosUsuario = {
            password: 'contrasena',
        };

        const response = await supertest(app)
            .post(`/usuario/login/${encodeURIComponent(email)}`)
            .send(datosUsuario);

        console.log(response.body);    

        expect(response.status).toBe(200);
        expect(response.body.message).not.toBe('Usuario o Contraseña Incorrectos');
        //expect(response.body.data).toBeDefined(); // Puedes ajustar según la estructura de tu respuesta
    });

});


describe('PUT - Usuario', () => {
    test('Cambiar contraseña de usuario', async () => {
        const email = 'prueba@gmail.com'; // Cambia el email según tus necesidades
        const nuevaContrasena = 'nuevacontrasena';

        const response = await supertest(app)
            .put(`/usuario/cambiarPass/${encodeURIComponent(email)}`)
            .send({ nuevaContrasena });

        console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Contraseña Actualizada');
        // Puedes agregar más aserciones según la estructura de tu respuesta
    });

    test('Cambiar contraseña de usuario', async () => {
        const email = 'prueba@gmail.com'; // Cambia el email según tus necesidades
        const nuevosDatos = {
            nombre: 'Nombre de Prueba',
            apellido: 'Apellido de Prueba editado',
            telefono: 45678932,
            email: "nuevodato@gmail.com",
            passwordd: 'contrasena',
            fecha_nacimiento: "2004-01-01",
            administrador: 1,
        };

        const response = await supertest(app)
            .put(`/usuario/modificarDatos/${encodeURIComponent(email)}`)
            .send({ nuevosDatos });

        console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Datos Actualizados');
        // Puedes agregar más aserciones según la estructura de tu respuesta
    });


});