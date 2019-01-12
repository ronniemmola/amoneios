import { Request, Response } from 'express';
import { HTTPCode } from '../../../constants/index';
import { encodeFileIntoBase64 } from '../../../core/ImageController';
import { imageDirectory } from '../../../../app';

const highlightResponse = require('../../../private/highlightedProducts.json');
const path = require('path');


function advert(imageBase64hash: string, associatedCategoryId?: number,associatedProductsIds?: Array<number>) {
    if (imageBase64hash == null) {
        return {}
    }
    if (associatedCategoryId != null && associatedCategoryId != undefined) {
        return {
            "advertisting-image": imageBase64hash,
            "category-id": associatedCategoryId
        }
    }
    else if (associatedProductsIds != null && associatedProductsIds != undefined) {
        return {
            "advertisting-image": imageBase64hash,
            "associated-product-ids": associatedProductsIds
        }
    } else {
        return { "advertisting-image": imageBase64hash }
    }
}

async function loadHighlights() {
    try {
        const highlights = highlightResponse.highlights;
        if (highlights != null && highlights.length > 0) {
            let currentHighlights = new Array();
            highlights.forEach(function (highlight) {
                const procutsIds = highlight.associatedProductsIds;
                const categoryId = highlight.associatedCategoryId;
                const adervertisingImageName = highlight.adervertisingImageName;

                if (adervertisingImageName == null) {
                    return;
                }
                const fileName = imageDirectory() + adervertisingImageName;
                const imageBase64hash = encodeFileIntoBase64(fileName);

                if (categoryId != null && categoryId != 0) {
                   currentHighlights.push(advert(imageBase64hash, categoryId))
                } else if (procutsIds != null) {
                    currentHighlights.push(advert(imageBase64hash, null, procutsIds))
                }else {
                    currentHighlights.push(advert(imageBase64hash))
                }
            });
            return currentHighlights;
        } else {
            throw {
                status: HTTPCode.NotFound,
                message: "No advertisement at this time"
            }
        }

    } catch (error) {
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
    } catch (error) {
        response.status(HTTPCode.InternalError).json(error.message || "Internal error");
    }

}
