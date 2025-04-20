import ImageCard from './ImageCard';
import SignInCard from './SignInCard';
import SignupCard from './SignInCard';
import { useRouter } from 'next/router';

const SignInPage = () => {
  return (
    <>
      <div className="bg-white h-[80vh] flex items-center justify-center">
        <div className="bg-white mt-20 max-w-[1200px] px-5 items-center gap-5">
          <SignInCard />
        </div>
      </div>
    </>
  );
};
export default SignInPage;
