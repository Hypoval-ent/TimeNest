"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import { useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
const Timetable = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Event 1" },
    { id: 2, title: "Event 2" },
    { id: 3, title: "Event 3" },
  ]);
  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    allDay: false,
    id: 0,
  });

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-events");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data-id");
          let start = eventEl.getAttribute("data-start");
          return {
            title,
            id,
            start,
          };
        },
      });
    }
  }, []);
  function handleDateClick(arg) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(), // Unique ID based on current time
    });
    setShowModal(true);
  }
  function addEvent(data) {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  }
  function handleDeleteModal(data) {
    setShowDeleteModal(true);
    setIdToDelete(data.event.id);
  }
  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => String(event.id) !== String(idToDelete))
    );
    setShowDeleteModal(false);
    setIdToDelete(null);
  }
  function handleCloseModal() {
    setNewEvent({ title: "", start: "", allDay: false, id: 0 });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }
  function handleChange(e) {
    setNewEvent({ ...newEvent, title: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({ title: "", start: "", allDay: false, id: 0 });
  }
  function closeAddEventModal() {
    setNewEvent({ title: "", start: "", allDay: false, id: 0 });
    setShowModal(false);
  }
  return (
    <>
      <main className="text-white" >
        <div className="grid grid-cols-10">
          {/* Draggable Events */}
          {/* <div id="draggable-events" className="col-span-1">
            <h1 className="text-lg font-bold text-center">Drag event</h1>
            {events.map((event) => (
              <div
                className="fc-event border-2 w-full rounded-md text-center bg-white text-black cursor-pointer"
                key={event.id}
                title={event.title}
                data-id={event.id} // <-- Add this
                data-start={event.start || ""}
              >
                {event.title}
              </div>
            ))}
          </div> */}
          {/* Timegrid */}
          <div className="col-span-10">
            <FullCalendar
              height={"80vh"}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridDay",
              }}
              initialView="timeGridDay"
              events={allEvents}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>
        </div>

        <Transition show={showDeleteModal} as={React.Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setShowDeleteModal(false)}
          >
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Event
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this event?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition show={showModal} as={React.Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setShowModal(false)}
          >
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CheckIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add Event
                        </Dialog.Title>

                        <form action="submit" onSubmit={handleSubmit}>
                          <div className="mt-2">
                            <input
                              type="text"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:lading-6"
                              placeholder="Event Title"
                              value={newEvent.title}
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:col-start-2 sm:w-auto"
                              disabled={newEvent.title === ""}
                            >
                              Create
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={closeAddEventModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
    </>
  );
};

export default Timetable;
