import Image from 'next/image'
import React from 'react'
import Event from './Event'
import CloseSVG from "../assets/cross.svg";
import { toggleModal } from '../functions/Modal';

function Modal({eventRef}) {
  return (
    <div
        id="modal"
        className="absolute top-0 left-0 hidden h-screen w-screen flex justify-center items-center bg-[#070611b9] backdrop-brightness-75 backdrop-blur-[3px]"
      >
        <div className="h-[70%] w-[55%] relative bg-[#0c0c0c2a] shadow-[#262c4d75] shadow-[0_0_100px_4px]  backdrop-blur-[6px] flex items-center justify-center">
          <div
            onClick={()=>{toggleModal(eventRef)}}
            className="text=white absolute top-2 right-2 font-proximaRegular h-[2rem] w-[2rem]"
          >
            <button className="h-full w-full relative">
              <Image src={CloseSVG} alt="" className='h-full w-full' />
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