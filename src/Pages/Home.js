import React from "react";
import { AiFillAccountBook, AiOutlineMail, AiFillPhone } from 'react-icons/ai';
import { FaUserGraduate, FaBriefcase } from 'react-icons/fa';

function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold">Welcome to LCA System</h1>
      <div className="flex flex-wrap justify-left">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <AiFillAccountBook className="text-3xl text-teal-500 mx-auto" />
          <h3 className="text-xl font-semibold mt-4">LCA</h3>
          <p className="text-gray-600">Software Engineer</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
