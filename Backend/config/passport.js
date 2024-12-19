import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../model/user.model.js';
import { verifyToken } from '../utils/jwt.js';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;