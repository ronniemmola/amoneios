
import { Request, Response } from 'express';
import { HTTPCode, HTTPBodyKey } from '../../../constants/index';
import { htmlDirectory } from '../resources/pathProvider';
var fs = require('fs');

enum HTMLName {
    termsAndConditions = "terms-and-conditions",
    aboutUs = "about-us",
    contactUs = "contact-us",
    returnPolicy = "return-policy",
    howToBuy = "how-to-buy",
    paymentSuccess = "payment-success",
    paymentFailure = "payment-failure",
    paymentCancel = "payment-cancel"
}

export function loadHtml(htmlName: String, isPost: Boolean, response: Response, isCollecting?: Boolean, amount?: Number, transactionId?: String, siteName?: String) {
    const htlmContentController = new HtlmContentController();

    if (isPost==true && htlmContentController.allowedPostFor(htmlName)==false) {
        response.status(HTTPCode.NotFound).json("The content for " + htmlName + " was not found or does not support post");
        return
    }

    switch (htmlName) {
        case HTMLName.termsAndConditions:
        case HTMLName.aboutUs:
        case HTMLName.contactUs:
        case HTMLName.returnPolicy:
            return htlmContentController.loadContent(htmlName, response);
        case HTMLName.paymentCancel:
            return htlmContentController.loadPaymentCancelled(htmlName, response);
        case HTMLName.paymentSuccess:
            return htlmContentController.loadPaymentSuccess(response,isCollecting,amount, transactionId,siteName);
        default:
            return response.status(HTTPCode.NotFound).json({});
    }
}

class HtlmContentController {
    postAllowedPath: Array<String> = [HTMLName.paymentSuccess,HTMLName.paymentFailure,HTMLName.paymentCancel];

    public allowedPostFor(htmlPage: String): Boolean {
       return this.postAllowedPath.indexOf(htmlPage) >= 0
    }

    public async loadContent(htmlName: String, response: Response) {
        const fileName = htmlDirectory() + htmlName + '.html'
        try {
            response.status(200).header({ "Content-Type": "text/html" });
            response.sendFile(fileName);
        } catch (error) {
            response.status(500).json(error.body || error.message);
        }
        return;
    }

    public async loadPaymentSuccess(response: Response, collecting: Boolean, amount: Number, transactionId: String, siteName: String) {
        try {

            var fileName: String;
            if (collecting == true) {
                fileName = htmlDirectory + '/html/payment-success-collecting.html';
            } else {
                fileName = htmlDirectory + '/html/payment-success-delivering.html';
            }
            fs.readFile(fileName, 'utf8', function (err, html) {
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

    public async loadPaymentFailure(htmlName: String, response: Response) {
        try {
            response.status(200).header({ "Content-Type": "text/html" });
            response.sendFile(htmlDirectory + '/html/payment-failure.html');
        } catch (error) {
            response.status(500).json(error.body || error.message);
        }
    }


    public async loadPaymentCancelled(htmlName: String, response: Response) {
        try {
            response.status(200).header({ "Content-Type": "text/html" });
            response.sendFile(htmlDirectory + '/html/payment-cancel.html');
        } catch (error) {
            response.status(500).json(error.body || error.message);
        }
    }

}