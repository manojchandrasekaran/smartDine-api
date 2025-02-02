import passport from 'passport';
import passportJWT from 'passport-jwt';

import knex from '../../config/database/index.js';

import config from '../../config/environment/config.js';

const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.signedCookies) {
    token = req.signedCookies[config.COOKIE_NAME];
  }
  return token;
};

jwtOptions.jwtFromRequest = cookieExtractor;
jwtOptions.secretOrKey = config.SECRET_KEY;


export default () => {
  const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    console.log(jwt_payload);
    const ad_id = jwt_payload.ad_id;
    let user;
    try {
      user = await knex('admins')
        .where({
          ad_id,
        })
        .select('*')
        .first();
      if (!user) {
        throw new Error('No record found for the given ad_id');
      }
    } catch (error) {
      return next(null, false);
    }


    user.loggedAs = jwt_payload.loggedAs;
    delete user.ad_password;
    if (user) return next(null, user);
    next(null, false);
  });


  passport.use('jwt', strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
