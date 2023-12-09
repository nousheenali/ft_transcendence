'use client';
import { Title } from '@/components/Login/Title/Title';
import { IntraAuthButton } from '@/components/Login/AuthButton/IntraAuth';
import Team from '@/components/Login/Team/Team';
import { Footer } from '@/components/Login/Footer/Footer';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/AuthProvider';
import { API_ENDPOINTS } from '../../../../config/apiEndpoints';
import { verifyTwoFa } from '../../../../services/two-fa';
import { Modal } from 'react-daisyui';
import axios from 'axios';
import { useRouter } from 'next/navigation';

/*
 * TODO: Put more spacing between the button and the team section.
 *
 * NOTE: The Header and the Footer it is on the layout.tsx file.
 * */

export default function Home() {
  const { user } = useContext(AuthContext);

  // const callbackUrl = "/";
  // const handleLogin = async () => {
  //   await signIn("42-school", {
  //     redirect: true,
  //     callbackUrl,
  //   });
  // };

  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleVerify = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (code === '') {
        toast.error('CODE IS REQUIRED');
        return;
      }

      const response = await axios.post(
        `${process.env.NESTJS_URL}${API_ENDPOINTS.verifyTwoFa}`,
        { userLogin: user.login!, token: code },
        { withCredentials: true }
      );

      // Assuming the API sends a response indicating success or failure
      // You can adjust this based on the actual API response format
      // if (response.data.isValid) {
      // toast.success('WELCOME BACK');
      // location.replace('/');
      // rout

      router.push('/redirect');

      // or use router.push('/') if you are using a routing library
      // } else {
      // toast.error('CODE IS NOT VALID');
      handleShow(); // Show an error or additional info as needed
      // }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Use URLSearchParams to work with query strings
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('show2faModal') === 'true') {
      handleShow();
    }
  }, []);

  return (
    <>
      <main className="w-screen h-full flex flex-col items-center gap-20 mt-32">
        <Title />
        <a href={`${process.env.NEXT_PUBLIC_SOCKET_URL}/auth/intra`}>
          <button>
            <IntraAuthButton />
          </button>
        </a>
        <Team />
        <Footer />
        <Modal
          className="overflow-hidden w-[267px] h-[310px] m-0 p-0 gap-0 bg-aside-fill-70  border-b-start-game border-b-2 rounded-2xl "
          ref={ref}
          id="login"
        >
          {/* Header */}
          <Modal.Header className="font-bold m-0">
            <div className="flex justify-center items-center h-full">
              <p>TW-FA VERIFICATION</p>
            </div>
          </Modal.Header>
          <Modal.Body className="flex flex-col m-0 py-2">
            <div className="flex justify-center mt-3 p-2 items-center rounded-md bg-search-box-fill w-full h-8 border-[0.5px] border-chat-search-stroke">
              <input
                className="ml-2 bg-search-box-fill font-thin text-sm text-search-box-text w-40 h-full focus:outline-none hover:cursor-text"
                type="search"
                name="search"
                placeholder="Enter Authenticator Code"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Actions className="flex items-center  justify-center mt-2 ">
            <button
              type="submit"
              onClick={(e) => handleVerify(e)}
              className="text-start-game font-saira-condensed font-bold text-xl h-18 w-60 border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx"
            >
              VERIFY
            </button>
          </Modal.Actions>
        </Modal>
      </main>
    </>
  );
}
