import supertest from 'supertest';
import app from '../src/index';

describe('GET - Ping Route', () => {
    test('Prueba de ruta /ping', async () => {
        const response = await supertest(app).get('/ping');

        // Verifica que la respuesta tenga el código 200 (OK)
        expect(response.status).toBe(200);

        // Verifica que el cuerpo de la respuesta sea la cadena esperada
        expect(response.text).toBe('Frontend y Backend Conectados');
    });
});
