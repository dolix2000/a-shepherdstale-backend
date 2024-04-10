/**
 * JS File for caching content instead of loading the content new everytime
 * if data is accessed.
 * Based on the tutorial: https://scotch.io/tutorials/how-to-optimize-node-requests-with-simple-caching-strategies
 * but adjusted to our needs
 */
const cache = require('memory-cache');
const memoryCache = new cache.Cache();

/**
 * Cache middleware, to store values instead of generating it new everytme the website gets
 * @param  {how long the cache should be stored} duration
 */
const cacheMiddleware = (duration) => {
    return (req, res, next) => {
        // generating key
        const key =  '__express__' + req.originalUrl || req.url;
        const cacheContent = memoryCache.get(key);
        console.log("cached " + cacheContent);
        // if content is already stored, send that content
        if (cacheContent){
            // send cached content
            res.send(cacheContent);
            return;
        } else { // no content --> result stored in cache, before response
            res.sendResponse = res.send;
            res.send = (body) => {
                memoryCache.put(key, body, duration * 1000);
                res.sendResponse(body);
            }
            next();
        }
    }
}

module.exports = cacheMiddleware;
