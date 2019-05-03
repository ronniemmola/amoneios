import * as express from 'express';
import { APIConstants } from  '../../../constants';
import { StaticContentController } from '../controller';

const staticContentController = new StaticContentController();
const router = express.Router();


router.post("/v1/html/:contentName/", staticContentController.postHtlm);
router.get("/v1/html/:contentName/", staticContentController.loadHtlm);
router.get("/v1/image/:imageName/", staticContentController.loadImage);

export = router;