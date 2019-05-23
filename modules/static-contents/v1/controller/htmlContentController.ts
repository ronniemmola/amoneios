
import { Request, Response } from 'express';
import { HTTPCode, HTTPBodyKey } from '../../../constants/index';
import { fileDirectory } from '../resources/pathProvider';
var fs = require('fs');

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

    public async loadReturnPolicy(response: Response) {
        try {
            response.status(200).header({ "Content-Type": "text/html" });
            response.sendFile(fileDirectory + '/html/returnPolicy.html');
        } catch (error) {
            response.status(500).json(error.body || error.message);
        }
    }

    public async loadPaymentSuccess(response: Response, collecting: Boolean, amount: Number, transactionId: Number, siteName: String) {
        try {
          
            var fileName: String;
            if (collecting==false) {
                fileName = fileDirectory + '/html/paymentSuccessDelivering.html';
            } else {
                fileName = fileDirectory + '/html/paymentSuccessCollecting.html';
            }
            fs.readFile(fileName, 'utf8', function(err, html){
                var orderNumberRegex = '{order-number}';
                var amountRegex = '{amount}';
                var siteRegex = '{site}';
                const ammendedURL = html.replace(orderNumberRegex, transactionId).replace(amountRegex, amount).replace(siteRegex, siteName);
                response.status(200).header({ "Content-Type": "text/html" });
                response.end(ammendedURL);
            });
            
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