"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefreshExpiresIn = exports.epochTimeIsPast = exports.epochAtSecondsFromNow = exports.FALLBACK_EXPIRE_TIME = void 0;
exports.FALLBACK_EXPIRE_TIME = 600; // 10minutes
// Returns epoch time (in seconds) for when the token will expire
// 'secondsFromNow' should always be an integer, but some auth providers has decided that whole numbers should be strings...
const epochAtSecondsFromNow = (secondsFromNow) => Math.round(Date.now() / 1000 + Number(secondsFromNow));
exports.epochAtSecondsFromNow = epochAtSecondsFromNow;
/**
 * Check if the Access Token has expired.
 * Will return True if the token has expired, OR there is less than 30 seconds until it expires.
 */
function epochTimeIsPast(timestamp) {
    const now = Math.round(Date.now()) / 1000;
    const nowWithBuffer = now + 30;
    return nowWithBuffer >= timestamp;
}
exports.epochTimeIsPast = epochTimeIsPast;
const refreshExpireKeys = [
    'refresh_expires_in', // KeyCloak
    'refresh_token_expires_in', // Azure AD
];
function getRefreshExpiresIn(tokenExpiresIn, response) {
    for (const key of refreshExpireKeys) {
        if (key in response)
            return response[key];
    }
    // If the response has a refresh_token, but no expire_time. Assume it's at least 10m longer than access_token's expire
    if (response.refresh_token)
        return tokenExpiresIn + exports.FALLBACK_EXPIRE_TIME;
    // The token response had no refresh_token. Set refresh_expire equals to access_token expire
    return tokenExpiresIn;
}
exports.getRefreshExpiresIn = getRefreshExpiresIn;
