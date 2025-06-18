import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { User } from "../models/associations.js";
import 'dotenv/config';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ where: { email } });

        if (!user) {
            user = await User.create({
                username: profile.displayName,
                email,
                password: "google", 
                first_name: profile.name?.givenName || "Google",
                last_name: profile.name?.familyName || ""
            });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ["id", "emails", "name", "displayName"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ where: { email } });

        if (!user) {
            user = await User.create({
                username: profile.displayName,
                email: email || `${profile.id}@facebook.com`,
                password: "facebook",
                first_name: profile.name?.givenName || "Facebook",
                last_name: profile.name?.familyName || ""
            });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));
