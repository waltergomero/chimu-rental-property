import NextAuth from "next-auth"
import connectDB from "@/config/database";
import User from "./models/User";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  callbacks:{
    async signIn({profile}) {
      await connectDB();
      const userExist = await User.findOne({email: profile.email});

      if(!userExist){
        await User.create({
          first_name: "first name",
          last_name: "last name",
          name: profile.name,
          image: "",
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