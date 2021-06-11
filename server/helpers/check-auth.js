// for upload and generate thumbnails onlu

import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  // const authorization = req.headers.authorization;
  try {
    const token = req.headers.authorization.slice(7, req.headers.authorization.length);
    //console.log('CHECK SUCCESSFUL: Your token: ' + token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');
    req.userData = decoded;
    next();
  } catch (error) {
    // 401: unauthenticated
    return res.status(401).json({
      message: 'Auth failed',
      error
    });
    
  }
}

export default checkAuth;