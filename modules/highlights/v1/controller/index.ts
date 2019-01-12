import { Request, Response } from 'express';
import  { HTTPCode } from '../../../constants/index';
import  { encodeFileIntoBase64 } from '../../../core/ImageController';
import  { imageDirectory } from '../../../../app';

const highlightResponse = require('../../../private/highlightedProducts.json');
const path = require('path');

export async function loadHighlights() {
    try {
        const procutsIds =  highlightResponse.associatedProductsIds;
        const adervertisingImageName =  highlightResponse.adervertisingImageName;
      
        if (procutsIds==null || adervertisingImageName==null) {
            return [];
        }
       
        const fileName =  imageDirectory() +  adervertisingImageName;
        const imageBase64hash = encodeFileIntoBase64(fileName);
      
        return  {
            "advertisting-image" : imageBase64hash,
            "associated-product-ids" : procutsIds
        }
    } catch (error){
        throw {
            status: HTTPCode.InternalError,
            message: error
        }
    }
}

export const highlightedProducts = async (request: Request, response: Response) => {
    try {
        const highlights = await loadHighlights();
        response.status(200).json(highlights);
    } catch(error){
        response.status(HTTPCode.InternalError).json(error.message || "Internal error");
    }
    
}