import { doSocialLogin } from "@/actions/action-socialLogin";
import { FcGoogle } from "react-icons/fc";
import { FaGithub} from "react-icons/fa";
const SocialSignInForm = () => {
    return (
        <form action={doSocialLogin}>
            <button className="bg-white text-black p-2 border-2  border-gray-300 rounded-md m-1 text-sm" type="submit" name="action" value="google">
            <FcGoogle className='inline-block mr-2'/>  Sign In With Google
            </button>

            <button className="bg-white text-black p-2 border-2  border-gray-300 rounded-md m-1 text-sm" type="submit" name="action" value="github">
                <FaGithub className='inline-block mr-2'/> Sign In With GitHub
            </button>
        </form>
    );
};

export default SocialSignInForm;

