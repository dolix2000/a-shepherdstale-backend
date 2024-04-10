/**
 * Function for basic authentication.
 * This function checks if authorization headers are set and valid.
 * If they are not valid a error message gets returned.
 * @param  {contains information about the HTTP request} req
 * @param  {object to handle the request} res
 * @param  {passes control to the next matching route} next
 */
function authenticate(req, res, next) {
    const {headers: {authorization } } = req;

    // if there is no authentication header throw error
    if(!authorization){
        // if login needed set this
        //res.set('WWW-Authenticate', 'Basic realm="401"') // change this
        //res.status(401).send('Authentication required.') // custom message
        return res.status(401).json({error: 'Missing Authorization Header'})
    }

    // encoding authHeader 
    // splitting the string Basic username:password -> Basic | username:password -_> username:password 
    // returning edemone:secret --> splitting to auth[0] = edemone, auth[1] = secret
    const auth = Buffer.from(authorization.split(' ')[1], 'base64').toString().split(':') 

    // get usernamer
    const username = auth[0];
    // get password
    const password = auth[1];

    // checking if username and password are equal if not throw error
    if(username == process.env.HER_USERNAME && password == process.env.HER_PASSWORD) {
        next();
    } else {
        return res.status(401).json({error: 'Invalid Authentication Credentials'})
    }
}

module.exports = authenticate;
