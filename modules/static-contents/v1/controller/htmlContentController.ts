
import { Request, Response } from 'express';
import { HTTPCode, HTTPBodyKey } from '../../../constants/index';
import { fileDirectory } from '../../../../private/files';

export class HtlmContentController {

    public async loadTermsAndConditions(response: Response) {
        try {
            response.status(200).header({ "Content-Type": "text/html" });
            response.sendFile(fileDirectory + '/html/termsAndConditions.html');
        } catch (error) {
            response.status(500).json(error.body || error.message);
        }
    }

    public async loadAboutUs(response: Response) {
        try {
            response.status(200).header({ "Content-Type": "text/html" });
            response.sendFile(fileDirectory + '/html/aboutUs.html');
        } catch (error) {
            response.status(500).json(error.body || error.message);
        }
    }

    public async loadContactUs(response: Response) {
        try {
            response.status(200).header({ "Content-Type": "text/html" });
            response.sendFile(fileDirectory + '/html/contactUs.html');
        } catch (error) {
            response.status(500).json(error.body || error.message);
        }
    }

    public async loadPaymentSuccess(response: Response, collecting: Boolean) {
        try {
            response.status(200).header({ "Content-Type": "text/html" });
            
            if (collecting==false) {
                console.log("sending delivery");
                response.sendFile(fileDirectory + '/html/paymentSuccessDelivering.html');
            } else {
                console.log("sending collection");
                response.sendFile(fileDirectory + '/html/paymentSuccessCollecting.html');
            }
            
        } catch (error) {
            response.status(500).json(error.body || error.message);
        }
    }

    public async loadPaymentFailure(response: Response,  collecting: Boolean) {
        try {
            response.status(200).header({ "Content-Type": "text/html" });
            response.sendFile(fileDirectory + '/html/paymentFailure.html');
        } catch (error) {
            response.status(500).json(error.body || error.message);
        }
    }


    public async loadPaymentCancelled(response: Response,  collecting: Boolean) {
        try {
            response.status(200).header({ "Content-Type": "text/html" });
            response.sendFile(fileDirectory + '/html/paymentCancel.html');
        } catch (error) {
            response.status(500).json(error.body || error.message);
        }
    }

}