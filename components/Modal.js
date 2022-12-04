import Image from 'next/image'
import React from 'react'
import Event from './Event'
import CloseSVG from "../assets/cross.svg";
import { toggleModal } from '../functions/Modal';

function Modal({eventRef}) {
  return (
    <div
        id="modal"
        className="absolute top-0 hidden h-full w-full flex justify-center items-center bg-[#0000003d] backdrop-brightness-75 backdrop-blur-[2px]"
      >
        <div className="h-[85%] w-[75%] relative bg-[#1e2329] flex items-center justify-center">
          <div
            onClick={()=>{toggleModal(eventRef)}}
            className="text=white absolute top-2 right-2 font-proximaRegular h-[8%] w-[5%]"
          >
            <button className="h-full w-full relative">
              <Image src={CloseSVG} alt="" layout="fill" objectFit="contain" />
            </button>
          </div>
          <Event
            ref={eventRef}
            toggleModal={toggleModal}
          />
        </div>
      </div>
  )
}

export default Modal