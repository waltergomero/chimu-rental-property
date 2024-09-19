'use client'

import Link from "next/link";
import { useSession, signOut} from 'next-auth/react';
import { ArrowLeftStartOnRectangleIcon} from '@heroicons/react/24/outline';

const SignInForm =  () => {
    const session = useSession();
    const user_name = session.data?.user?.name
    const userId = session.data?.user?.id
    
    if(!user_name)
    {
        return(
            <Link href="/auth" className="lg:inline-flex lg:w-auto px-3 py-2 bg-green-400 rounded hover:bg-green-600">
                  Login
            </Link> 
            )
    }
    else{
        return(
            <>
            <Link href={`/profile/${userId}`} className="lg:inline-flex lg:w-auto px-3 py-2 rounded hover:bg-blue-800">
              Profile
            </Link>
            <div className="lg:inline-flex lg:w-auto px-3 py-2">

            <h1 className="text-xl mr-2 ">Welcome, {user_name}</h1>
                <button type="submit"
                    onClick={()=>{
                        signOut()
                    }}
                    className="flex items-center gap-3.5 px-6 py-1 text-sm rounded  duration-300 bg-pink-700 ease-in-out hover:text-primary lg:text-base">
                    <ArrowLeftStartOnRectangleIcon width="24" height= "24" />
                Log Out
                </button>
          </div>
          </>
        )
    }
};

export default SignInForm;

