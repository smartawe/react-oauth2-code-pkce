"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postWithXForm = void 0;
const errors_1 = require("./errors");
function buildUrlEncodedRequest(request) {
    let queryString = '';
    for (const [key, value] of Object.entries(request)) {
        queryString += `${queryString ? '&' : ''}${key}=${encodeURIComponent(value)}`;
    }
    return queryString;
}
function postWithXForm(url, request) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(url, {
            method: 'POST',
            body: buildUrlEncodedRequest(request),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then((response) => __awaiter(this, void 0, void 0, function* () {
            if (!response.ok) {
                const responseBody = yield response.text();
                throw new errors_1.FetchError(response.status, response.statusText, responseBody);
            }
            return response;
        }));
    });
}
exports.postWithXForm = postWithXForm;
