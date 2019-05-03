import * as express from 'express';
import { APIConstants } from  '../../../constants';
import { StaticContentController } from '../controller';

const staticContentController = new StaticContentController();
const router = express.Router();


router.post("/v1/html/:contentName/", staticContentController.postStaticContent);
router.get("/v1/html/:contentName/", staticContentController.loadStaticContent);
export = router;