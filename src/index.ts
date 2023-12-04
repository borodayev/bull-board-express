import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { Redis } from 'ioredis';
import passport from 'passport';
import { Strategy } from 'passport-local';
import session from 'express-session';
import {
  PORT,
  REDIS_PORT,
  REDIS_HOST,
  QUEUES_NAMES,
  USERNAME,
  PASSWORD
} from './config';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { Queue } from 'bullmq';

const run = () => {
  passport.use(
    'local',
    new Strategy(function (username: string, password: string, cb) {
      if (username === USERNAME && password === PASSWORD) {
        return cb(null, { user: 'admin' });
      }
      return cb(null, false);
    })
  );
  passport.serializeUser(function (user: Express.User, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (user: Express.User, cb) {
    cb(null, user);
  });

  const connection = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST
  });

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/');

  createBullBoard({
    queues: QUEUES_NAMES.map(
      (queuesName) =>
        new BullMQAdapter(
          new Queue(queuesName, {
            connection
          })
        )
    ),
    serverAdapter
  });

  const app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: 'secret123',
      saveUninitialized: true,
      resave: true,
      cookie: { maxAge: 86400000 }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login', (req, res) => {
    res.render('login', { invalid: req.query.invalid === 'true' });
  });

  app.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/login?invalid=true'
    }),
    (_, res) => {
      res.redirect('/');
    }
  );

  app.use(
    '/',
    (req: Request, res: Response, next: NextFunction) => {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.redirect('/login');
      }
      next();
    },
    serverAdapter.getRouter()
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

try {
  run();
} catch (e) {
  console.log(e);
  process.exit(1);
}
