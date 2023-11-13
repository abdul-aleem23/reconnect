import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import { Player } from '@lottiefiles/react-lottie-player';
import house from "../assets/animations/house-animation.json"

//Cookies
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // the function is using our projects auth and provider (googleLog-in)
      cookies.set("auth-token", result.user.refreshToken); // the auth-token is set to the refresh token
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col">

        <div className="flex h-full flex-col md:flex-row lg:flex-row items-center justify-center bg-sky-200">

          <div className="w-3/5 flex flex-col justify-center items-center">
            
            <div className="w-5/6">
              <h1 className="mb-4 text-3xl md:text-4xl lg:text-6xl font-extrabold leading-none tracking-tight text-gray-900 ">
                Where Nostalgia Meets{" "}
                <span className="underline underline-offset-3 decoration-8 decoration-blue-400">
                  Conversation.
                </span>
              </h1>
              <p className="text-md font-normal text-gray-700 lg:text-xl">
                Rediscover the Joy of Togetherness. Create Rooms, Share
                Memories, and Reconnect with Your Loved Ones in a Group Chat
                Environment. It&apos;s Family Time, Anytime.
              </p>
            </div>

            <div className="flex flex-row items-center mt-6">
              <button
                className="bg-transparent hover:bg-slate-900 text-slate-900 font-semibold hover:text-white py-2 px-6 border border-slate-900 hover:border-transparent rounded mr-4"
                onClick={signInWithGoogle}
              >
                Sign-in
              </button>
              <p className="mr-2">with</p>
              <FcGoogle size={23} />
              <p>oogle</p>
            </div>
          </div>

          <div className="flex justify-center items-center mt-3 md:w-1/2 lg:w-2/5 mr-8">
            <Player autoplay loop src={house}></Player>
          </div>

        </div>

      </div>
    </>
  );
};

export default Auth;
