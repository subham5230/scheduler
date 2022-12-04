import React from "react";

function Toast({ message, setMessage }) {
  const toastRef = React.useRef(null);
  React.useEffect(() => {
    if (message.length > 0) openToast();
  }, [message]);

  const openToast = () => {
    const toast = toastRef.current;

    toast.classList.remove("hidden");

    setTimeout(() => {
      closeToast();
    }, 3000);
  };

  const closeToast = () => {
    const toast = toastRef.current;

    toast.classList.add("hidden");
    setMessage("");
  };
  return (
    <div
      ref={toastRef}
      className="flex items-center hidden px-[1rem] bg-[#a3132b]  absolute min-w-[5rem] h-[2rem] bottom-[1rem] left-[1rem]"
    >
      {message}
    </div>
  );
}

export default Toast;
