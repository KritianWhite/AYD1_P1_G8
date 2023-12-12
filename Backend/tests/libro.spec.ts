import supertest from 'supertest';
import app from '../src/index';
//import { describe } from 'node:test';

describe('GET - Libro', () => {

    test('Retornar todos los libros libres', async () => {
        const response = await supertest(app).get('/libro');
        expect(response.status).toBe(200);
        expect(response.body.message).not.toBe('No se encuentran libros');
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
});

