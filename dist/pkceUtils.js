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
exports.generateCodeChallenge = exports.generateRandomString = exports.getRandomInteger = void 0;
function getRandomInteger(range) {
    const max_range = 256; // Highest possible number in Uint8
    // Create byte array and fill with 1 random number
    const byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray); // This is the new, and safer API than Math.Random()
    // If the generated number is out of range, try again
    if (byteArray[0] >= Math.floor(max_range / range) * range)
        return getRandomInteger(range);
    return byteArray[0] % range;
}
exports.getRandomInteger = getRandomInteger;
function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(getRandomInteger(possible.length - 1));
    }
    return text;
}
exports.generateRandomString = generateRandomString;
/**
 *  PKCE Code Challenge = base64url(hash(codeVerifier))
 */
function generateCodeChallenge(codeVerifier) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!((_a = window.crypto.subtle) === null || _a === void 0 ? void 0 : _a.digest)) {
            throw new Error("The context/environment is not secure, and does not support the 'crypto.subtle' module. See: https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle for details");
        }
        const encoder = new TextEncoder();
        const bytes = encoder.encode(codeVerifier); // Encode the verifier to a byteArray
        const hash = yield window.crypto.subtle.digest('SHA-256', bytes); // sha256 hash it
        const hashString = String.fromCharCode(...new Uint8Array(hash));
        const base64 = btoa(hashString); // Base64 encode the verifier hash
        return base64 // Base64Url encode the base64 encoded string, making it safe as a query param
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    });
}
exports.generateCodeChallenge = generateCodeChallenge;
