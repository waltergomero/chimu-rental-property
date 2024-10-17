import NextAuth from "next-auth"
import connectDB from "@/config/database";
import User from "./models/User";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {fetchUserByEmail} from '@/actions/user-actions'
import bcryptjs from 'bcryptjs';
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [ 
  //   Credentials({
  //   credentials: {
  //     email: {},
  //     password: {},
  //   },
  //   async authorize({ email, password}) {
  //     try {
  //         const user = await User.findOne({email: email});
  //         console.log("user:", user)
  //         if (user) {
  //             const isMatch =  await bcryptjs.compare(password, user.password); 

  //             if (isMatch) {
  //               console.log("user:", isMatch)
  //                 return user;
  //             } else {
  //                 throw new Error("Email or Password is not correct");
  //             }
  //         } else {
  //             throw new Error("User not found");
  //         }
  //     } catch (error) {
  //         throw new Error(error);
  //     }
  //   },
  // }), 
  GitHub, Google],
  callbacks:{
    async signIn({profile}) {
      await connectDB();
      console.log("profile: ", profile)

      var provider ="";
      
      const userExist = await User.findOne({email: profile.email});
      const providerGoogle = profile.iss;
      const providerGithub = profile.html_url

      if(providerGithub.includes("github")){
        provider = "github"
      }
      else if(providerGoogle.includes("google")){
          provider = "google"
        } 
      else {
        provider = "credentials"
      }
     console.log("provider: ", provider)

      if(!userExist){
        await User.create({
          first_name: profile.given_name | profile.login,
          last_name: profile.family_name | profile.login,
          name: profile.name,
          image: profile.picture | profile.avatar_url,
          provider: provider,
          email: profile.email,
          password: "password",
          isadmin: false,
          isactive: true,
        });
      }
      return true;
    },
    async session({session}) {
      const user = await User.findOne({email: session.user.email});
      session.user.id = user._id;
      return session;
    }
  }
})