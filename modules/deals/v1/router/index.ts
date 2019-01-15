import * as express from "express";
import * as dealsController from  '../controller';
import { APIConstants } from  '../../../constants';

var WooCommerceAPI = require('woocommerce-api');

var wooCommerceeClient = new WooCommerceAPI({
  url: APIConstants.base_url,
  consumerKey: APIConstants.customer_key,
  consumerSecret: APIConstants.customer_secret,
  wpAPI: true,
  version: 'wc/v1'
});

const router = express.Router();
router.get("/v1/current-deals", dealsController.currentDeals);
export = router;