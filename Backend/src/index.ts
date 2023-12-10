import express,{ Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Rutas Importadas
import indexRoutes from './routes/indexRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import libroRoutes from './routes/libroRoutes';

class Server {

    public app: Application;
    
    constructor() {
       this.app = express();
       this.config();
       this.routes();
    }

    config():void {
        this.app.set('port', process.env.PORT ||4000)
        this.app.use(morgan('dev'))
        this.app.use(cors()); // Para que Agular pueda pedir datos al servidor
        this.app.use(express.json()); // Obtener formato json desde Angular, para poder entenderlo
        this.app.use(express.urlencoded({extended: false})); // Enviar desde Fromularios HTML
    }
    // Rutas del servidor
    routes():void {
        this.app.use('/', indexRoutes);
        this.app.use('/usuario', usuariosRoutes);
        this.app.use('/libro', libroRoutes);
    }

    // Iniciar Servidor
    start():void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en el puerto ', this.app.get('port'))
        });
    }
}
const server = new Server();
server.start()