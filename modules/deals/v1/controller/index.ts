
import { Request, Response } from 'express';
import { HTTPCode, HTTPBodyKey } from '../../../constants/index';
import { encodeFileIntoBase64 } from '../../../core/ImageController';
import { imageDirectory } from '../../../../app';

const dealsResponse = require('../../../private/deals.json');

async function loadDeals() {
    try {
        const isValid = dealsResponse.isValid;
        if (isValid == null && isValid==false) {
            return {};
        }
       
        return {
            name: dealsResponse.name,
            product_ids: dealsResponse.product_ids,
            category_id: dealsResponse.category_id,
            deal_color : dealsResponse.deal_color
         }

    } catch (error) {
        throw {
            status: HTTPCode.InternalError,
            message: error
        }
    }
}

export const currentDeals = async (request: Request, response: Response) => {
    try {
        const deals = await loadDeals();
        response.status(200).json(deals);
    } catch (error) {
        response.status(HTTPCode.InternalError).json(error.message || "Internal error");
    }

}