import { Request, Response } from 'express';
import { HTTPCode, HTTPBodyKey } from '../../../constants/index';
import { HtlmContentController } from './htmlContentController';

enum StaticContent {
    termsAndConditions = "terms-and-conditions",
    aboutUs = "about-us",
    contactUs = "contact-us",
    paymentSuccess = "payment-success",
    paymentFailure = "payment-failure",
    paymentCancel = "payment-success",
}

export class StaticContentController {    
    public constructor() { }

    public loadStaticContent(request: Request, response: Response) {
       
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
                case StaticContent.paymentSuccess, StaticContent.paymentFailure, StaticContent.paymentCancel:
                    const collectionQuery = request.query.collecting;
                    if (!collectionQuery || collectionQuery==null) {
                        response.status(HTTPCode.BadRequest).json("Missing collecting query parameter value");
                        return;
                    }
                    const collecting: Boolean = JSON.parse(collectionQuery);
                   
                    if (contentName==StaticContent.paymentSuccess) {
                        return htlmContentController.loadPaymentSuccess(response,collecting);
                    } else if(contentName==StaticContent.paymentFailure) {
                        return htlmContentController.loadPaymentFailure(response,collecting);
                    } else if(contentName==StaticContent.paymentCancel) {
                        return htlmContentController.loadPaymentCancelled(response,collecting);
                    }
                    return;
                default:
                    response.status(HTTPCode.NotFound).json({});
                    break;
            }
        } catch (error) {
            response.status(error.statusCode || 500).json(error.body || error.message);
        }
    }
}