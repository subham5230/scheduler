import Head from "next/head";
import Image from "next/image";
import Modal from "../components/Modal";
import styles from "../styles/Home.module.css";
import React from "react";
import { toggleModal } from "../functions/Modal";

export default function Home() {
  const eventRef = React.useRef(null);
  return (
    <div className={styles.container}>
      <button onClick={()=>{toggleModal(eventRef)}} className="bg-[#F4B301] text-black w-full h-full font-proximaRegular">
        Schedule a meet
      </button>
      <Modal eventRef={eventRef} />
    </div>
  );
}
