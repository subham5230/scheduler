export const toggleModal = (eventRef) => {
  const modal = document.getElementById("modal");
  eventRef.current.initiateLoading();

  if (modal.classList.contains("hidden")) {
    eventRef.current.fetchDatesWrapper();
  } else {
    eventRef.current.flushData();
  }

  modal.classList.toggle("hidden");
};
