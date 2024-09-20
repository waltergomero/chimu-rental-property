'use client';
import {
  AtSymbolIcon,
  KeyIcon, EyeIcon, EyeSlashIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from '@/actions/user-actions';
import Link from 'next/link';
import SocialSignInForm from './socialSignInForm';


const LoginForm = () => {

  const router = useRouter();
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("")

  async function onSubmit(event) {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget);
        const response = await doCredentialLogin(formData);

        if (!!response.error) {
            console.error("error 1: ", response.error);
            setError(response.error.message);
        } else {
            router.push("/dashboard");
        }
    } catch (e) {
       console.error("error 2: ", e);
        setError("Check your Credentials");
    }
}

  return (
    <main className="w-full flex items-center justify-center min-h-screen">
    <div className="w-150 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="px-4 mb-4 ">
          <h3 className="mb-1.5 mt-4  text-center text-2xl font-semibold text-black dark:text-white">
            Sign in to your account
          </h3>
          <div className="mb-5.5 mt-5 flex justify-center">
        <Link href="#" className="text-md text-blue-500 hover:underline">
          You don't have an account?
        </Link>
      </div>
    <form onSubmit={onSubmit}>
    <div className="p-6.5">
        <div className="mb-4">
            <label className="block text-sm font-medium text-black dark:text-white">Email:</label>
            <div className="relative">
            <input
                 id="email"
                 type="email"
                 name="email"
                 placeholder="Enter your email address"
                 required
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-black dark:text-white">Password:</label>
            <div className="relative">
            <input
                id="password"
                value={password}
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"/>
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <span onClick={() => setVisible(!visible)} className="cursor-pointer absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
             {!visible ? <EyeSlashIcon /> : <EyeIcon />} 
            </span>
        </div>
        </div>
        <div className="mb-5.5 mt-5 flex  items-center justify-between">
          <div className='flex items-center'>
          <input id='rememberme' name='rememberme' type='checkbox'
          className='h-4 w-4 text-indigo-600 rounded'/><label htmlFor='rememberme' className='ml-2 block text-sm text-gray-900'>Remember me</label>
          </div>
          <div>
          <Link href="#" className="text-md text-blue-500 hover:underline">
            Forgot your password?
          </Link>
          </div>
    </div>
    <div className='mt-4'>
    <button type="submit" className="flex w-full justify-center rounded bg-blue-500 p-3 font-medium text-gray hover:bg-opacity-90">
      Sign In
    </button>
    </div>
    <div className="flex items-end space-x-1 mt-2" aria-live="polite" aria-atomic="true" >
          {error && (
            <>
              <ExclamationCircleIcon className="h-6 w-6 text-danger" />
              <p className="text-md text-danger">{error}</p>
            </>
          )}
        </div>
        </div>
    </form>
       <SocialSignInForm/>
    </div>
    </div>
    </main>
  )
}

export default LoginForm;