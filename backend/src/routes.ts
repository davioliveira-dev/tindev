import {Router as router} from 'express';
import DevController from '@controllers/Dev';
import LikeController from '@controllers/Like';
import DislikeController from '@controllers/Dislikes';

const routes = router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

export default routes;
