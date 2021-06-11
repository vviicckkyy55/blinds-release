import jwt from 'jsonwebtoken';

// to keep logged in info
export const generateToken = (user) => {
  return jwt.sign(
    {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isMaster: user.isMaster,
  }, 
  process.env.JWT_SECRET || 'mysecretkey',
    {
      expiresIn: '1h',
    } 
  );
};

// to authenticate user
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(authorization) {
    const token = authorization.slice(7, authorization.length);  //Bearer XXXXXXXX... (removes Bearer_ and gives token XXXXXXXXX...)
    jwt.verify(
      token, process.env.JWT_SECRET || 'mysecretkey', 
      (err, decode) => {
        if(err) {
          res.status(401).send({message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      });
  } else {
    res.status(401).send({message: 'No Token'});
  }
}

// admin 

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ 
      message: 'Invalid Admin Token'
    })
  }
};

// master

export const isMaster = (req, res, next) => {
  if (req.user && req.user.isMaster) {
    next();
  } else {
    res.status(401).send({
      message: 'Invalid Master Token'
    })
  }
};

// master or admin

export const isMasterOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isMaster || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ 
      message: 'Invalid Admin/Master Token' 
    });
  }
};