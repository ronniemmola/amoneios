
import * as express from "express";
import * as highlightController from  '../controller';
var WooCommerceAPI = require('woocommerce-api');

var wooCommerceeClient = new WooCommerceAPI({
  url: 'https://test.amonet.co.za',
  consumerKey: 'ck_0c105911cd1f51f1cb4a3002f86328443a80b090',
  consumerSecret: 'cs_f7f7614f27d4ac015de3bc5bb346fa8c8c8f9228',
  wpAPI: true,
  version: 'wc/v1'
});

const router = express.Router();
router.get("/v1/highlighted-products", highlightController.highlightedProducts);
export = router;