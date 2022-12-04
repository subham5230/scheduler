import Head from "next/head";
import Image from "next/image";
import Modal from "../components/Modal";
import styles from "../styles/Home.module.css";
import React from "react";
import { toggleModal } from "../functions/Modal";
import Image1 from "../assets/image1.webp";
import Image2 from "../assets/image2.webp";

export default function Home() {
  const eventRef = React.useRef(null);
  return (
    <div className="container px-4 h-screen flex justify-center items-center overflow-hidden">
      <div className="lg:w-[70%] min-h-[80%] lg:h-[80%] flex">
        <div className="lg:w-1/2">
          <h1 className="text-6xl h-[20%] flex items-end font-brand font-semibold">
            Subham Mohanty
          </h1>
          <div className="flex mt-[3rem] lg:mt-0 lg:h-[80%] justify-between">
            <div className=" flex-1 lg:max-w-[75%] flex flex-col justify-center">
              <p className="text-md font-light my-2 text-[#dadada] tracking-wide">
                Hey, I am glad you are here!
              </p>
              <p className="text-md font-light my-2 text-[#dadada] tracking-wide">
                Let me introduce myself, I am a Web Developer with 2 years of
                experience building high performance and creative websites.
              </p>
              <p className="text-md font-light my-2 text-[#dadada] tracking-wide">
                I use combinations of various cutting edge technologies to build
                that{" "}
                <span className="font-semibold text-[#adadad]">PERFECT</span>{" "}
                site which is immersive, stable, secure and{" "}
                <span className="font-semibold text-[#adadad]">FAST!</span>
              </p>
              <p className="text-md font-light my-2 text-[#dadada] tracking-wide">
                Check out my work <a className="font-semibold underline underline-offset-[3px]" target="_blank" rel="noreferrer" href="https://subhammohanty.me">here</a>
              </p>
              <p className="text-lg mt-8 lg:mt-2 mb-1 text-[#d8d8d8]">
                Have an idea in your mind? Let&apos;s Discuss!
              </p>
              <button
                onClick={() => {
                  toggleModal(eventRef);
                }}
                className="ctaButton text-white w-full lg:w-[75%] font-semibold text-lg h-[3rem] transition-all ease-linear duration-50"
              >
                SCHEDULE A MEET
              </button>
            </div>
            <div className="w-[3rem] hidden lg:flex items-end relative">
              <div className="text-[2.5rem] -z-10 font-light text-[#6a6192] tracking-widest  whitespace-nowrap flex-1 origin-bottom-left absolute bottom-0 -rotate-90">
                CREATIVE WEB DEVELOPER
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 hidden lg:flex">
          <div className=" w-1/2 p-4 flex items-end">
            <Image
              src={Image1}
              className="w-full h-[70%] image1container"
              alt=""
            />
          </div>
          <div className=" w-1/2 p-4">
            <Image
              src={Image2}
              className="w-full h-[70%] image2container"
              alt=""
            />
          </div>
        </div>

        <Modal eventRef={eventRef} />
      </div>
    </div>
  );
}
