import { Request, Response } from 'express';
import { HTTPCode, HTTPBodyKey } from '../../../constants/index';
import { HtlmContentController } from './htmlContentController';

enum StaticContent {
    termsAndConditions = "terms-and-conditions",
    aboutUs = "about-us",
    contactUs = "contact-us"
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
                default:
                    response.status(HTTPCode.NotFound).json({});
                    break;
            }
        } catch (error) {
            response.status(error.statusCode || 500).json(error.body || error.message);
        }
    }
}