import * as express from 'express';
import { APIConstants } from  '../../../constants';
import { StaticContentController } from '../controller';

const staticContentController = new StaticContentController();
const router = express.Router();
router.get("/v1/html/:contentName/", staticContentController.loadStaticContent);
export = router;