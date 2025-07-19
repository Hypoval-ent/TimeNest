"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Transition, Dialog } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const Rough = () => {
  const generatedEvents = useSelector(
    (state) => state.events.generatedEvents
  );

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

  // Load generatedEvents into calendar
  useEffect(() => {
    if (generatedEvents && generatedEvents.length > 0) {
      const today = new Date().toISOString().split("T")[0];

      const formatted = generatedEvents.map((event) => ({
        ...event,
        start: `${today}T${event.start}`,
        end: `${today}T${event.end}`,
        allDay: false,
        id: `${Date.now()}-${Math.random()}`,
        generated: true,
      }));

      // Remove old generated events first
      setAllEvents((prev) =>
        prev.filter((e) => !e.generated).concat(formatted)
      );
    }
  }, [generatedEvents]);

  // Drag-and-drop external
  useEffect(() => {
    let draggableEl = document.getElementById("draggable-events");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data-id");
          let start = eventEl.getAttribute("data-start");
          return { title, id, start };
        },
      });
    }
  }, []);

  function handleDateClick(arg) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
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
    setAllEvents(allEvents.filter((e) => String(e.id) !== String(idToDelete)));
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
    e.preventDefault();
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
      <main className="text-white">
        <div className="grid grid-cols-10">
          <div className="col-span-10">
            <FullCalendar
              height={"83vh"}
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
              drop={addEvent}
              eventClick={handleDeleteModal}
            />
          </div>
        </div>

        {/* Delete Modal */}
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Event
                        </Dialog.Title>
                        <p className="text-sm text-gray-500 mt-2">
                          Are you sure you want to delete this event?
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
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

        {/* Add Event Modal */}
        <Transition show={showModal} as={React.Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeAddEventModal}>
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <CheckIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add Event
                        </Dialog.Title>
                        <form onSubmit={handleSubmit}>
                          <input
                            type="text"
                            placeholder="Event Title"
                            value={newEvent.title}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
                          />
                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                              type="submit"
                              className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-500 disabled:opacity-50"
                              disabled={!newEvent.title}
                            >
                              Create
                            </button>
                            <button
                              type="button"
                              onClick={closeAddEventModal}
                              className="bg-white text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
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

export default Rough;
