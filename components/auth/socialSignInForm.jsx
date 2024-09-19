import { doSocialLogin } from "@/actions/action-socialLogin";

const SocialSignInForm = () => {
    return (
        <form action={doSocialLogin}>
            <button className="bg-pink-400 text-white p-2 rounded-md m-1 text-md" type="submit" name="action" value="google">
                Sign In With Google
            </button>

            <button className="bg-black text-white p-2 rounded-md m-1 text-md" type="submit" name="action" value="github">
                Sign In With GitHub
            </button>
        </form>
    );
};

export default SocialSignInForm;

