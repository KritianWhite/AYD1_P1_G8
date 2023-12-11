import supertest from 'supertest';
import app from '../src/index';
//import { describe } from 'node:test';

describe('GET - Libro', () => {
    test('Retornar todos los libros libres', async () => {
        const response = await supertest(app).get('/libro');
        //console.log(response.body.message);

        // Verifica que la respuesta tenga el código 200 (OK)
        expect(response.status).toBe(200);


        // Verifica que el cuerpo de la respuesta sea la cadena esperada
       expect(response.body.message).not.toBe('No se encuentran libros');
    });
});

