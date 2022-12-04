export const toggleModal = (eventRef) => {
  const modal = document.getElementById("modal");
  eventRef?.current.initiateLoading();

  if (modal.classList.contains("hidden")) {
    eventRef?.current.fetchDatesWrapper();
  } else {
    eventRef?.current.flushData();
  }

  modal.classList.toggle("hidden");
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
