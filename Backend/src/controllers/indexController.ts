import {Request, Response} from 'express';
import pool from '../database'; // conexion base de datos

class IndexController{

    index (req: Request, res: Response){
        res.send('Hola Mundo')
    }
}

export const indexController = new IndexController();
