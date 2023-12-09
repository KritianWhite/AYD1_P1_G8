import {Router} from 'express';

import {pingController} from '../controllers/pingController';

class PingRoutes{
    public router: Router = Router();
    
    constructor(){      
        this.config();
    }

    config(): void {
        this.router.get('/', pingController.ping)
    }

    
}
const pingRoutes = new PingRoutes();
export default pingRoutes.router;