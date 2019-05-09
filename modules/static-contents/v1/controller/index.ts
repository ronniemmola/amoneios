import { Request, Response } from 'express';
import { HTTPCode, HTTPBodyKey } from '../../../constants/index';
import { HtlmContentController } from './htmlContentController';
import { imageDirectory } from '../../../../app';
var fs = require('fs');

enum StaticContent {
    termsAndConditions = "terms-and-conditions",
    aboutUs = "about-us",
    contactUs = "contact-us",
    paymentSuccess = "payment-success",
    paymentFailure = "payment-failure",
    paymentCancel  = "payment-cancel",
}

export class StaticContentController {    
    public constructor() { }
    public postHtlm(request: Request, response: Response){
        
        try {
            const contentName = request.params.contentName;
            const htlmContentController = new HtlmContentController();
            switch (contentName) {
                case StaticContent.paymentSuccess:
                case StaticContent.paymentFailure:
                case StaticContent.paymentCancel:
                    const collectionQuery = request.query.collecting;
                    if (!collectionQuery || collectionQuery==null) {
                        return response.status(HTTPCode.BadRequest).json("Missing collecting query parameter value");
                    }
                    const collecting: Boolean = JSON.parse(collectionQuery);
                    
                    if (contentName==StaticContent.paymentSuccess) {
                        const amount = request.body.Amount;
                        const siteCode = request.body.SiteCode;
                        const transactionReference = request.body.TransactionReference;
                       
                        return htlmContentController.loadPaymentSuccess(response,collecting,amount,transactionReference,siteCode );
                    } else if(contentName==StaticContent.paymentFailure) {
                        return htlmContentController.loadPaymentFailure(response,collecting);
                    } else if(contentName==StaticContent.paymentCancel) {
                        return htlmContentController.loadPaymentCancelled(response,collecting);
                    }
                default:
                    response.status(HTTPCode.NotFound).json("The content for " + contentName + " was not found");
                    break;
            }
        } catch (error) {
            response.status(error.statusCode || 500).json(error.body || error.message);
        }
    }
    
    public loadHtlm(request: Request, response: Response) {
       
        try {
            const contentName = request.params.contentName;
            const htlmContentController = new HtlmContentController();
            switch (contentName) {
                case StaticContent.termsAndConditions:
                    return htlmContentController.loadTermsAndConditions(response);
                case StaticContent.aboutUs:
                    return htlmContentController.loadAboutUs(response);
                case StaticContent.contactUs:
                    return htlmContentController.loadContactUs(response);
                case StaticContent.paymentSuccess:
                case StaticContent.paymentFailure:
                case StaticContent.paymentCancel:
                    this.postHtlm(request, response);
                    return;
                default:
                    response.status(HTTPCode.NotFound).json({});
                    break;
            }
        } catch (error) {
            response.status(error.statusCode || 500).json(error.body || error.message);
        }
    }

    public loadImage(request: Request, response: Response) {
      
        try {
            const imageName = request.params.imageName;
            const htlmContentController = new HtlmContentController();
            const fileName = imageDirectory() + imageName;
            var image = fs.readFileSync(fileName);
            response.writeHead(200, {'Content-Type': 'image/gif' });
            response.end(image, 'binary');
        } catch (error) {
            response.status(error.statusCode || 500).json(error.body || error.message);
        }
    }
}