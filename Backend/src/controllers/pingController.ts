import {Request, Response} from 'express';
import pool from '../database'; // conexion base de datos

class PingController{

    ping (req: Request, res: Response){
        res.send('Frontend y Backend Conectados')
    }
}

export const pingController = new PingController();
