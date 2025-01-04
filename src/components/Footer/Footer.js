import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#000435]">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                <img src={assets.logo} className="h-8 me-3" alt="" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  Expense<span classNameName='font-bold'>Sync</span>
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                  Resources
                </h2>
                <ul className="text-gray-400 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://create-react-app.dev/"
                      target="_blank"
                      className="hover:underline"
                    >
                      Create React App
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://tailwindcss.com/"
                      target="_blank"
                      className="hover:underline"
                    >
                      Tailwind CSS
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://firebase.google.com/"
                      target="_blank"
                      className="hover:underline"
                    >
                      Firebase
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                  contact
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://www.linkedin.com/in/jay-kalani-a7017a2b4/"
                      target='_blank'
                      className="hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/jk-codes642/expenseSync"
                      className="hover:underline "
                      target='_blank'
                    >
                      Github
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
          <p className='text-white text-xl text-center'>Made with ❤️ by Jay</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
