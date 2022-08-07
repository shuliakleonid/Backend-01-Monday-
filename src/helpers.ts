import {NextFunction} from 'express';
import {userAuth} from './users/user';

export const basicAuth = (req:any, res:any, next: NextFunction) => {

  console.log(req.headers)
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({message: 'Missing Authorization Header'});
  }
  const base64Credentials =  req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  const user = userAuth({ username, password });
  if (!user) {
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }
  next()

}
