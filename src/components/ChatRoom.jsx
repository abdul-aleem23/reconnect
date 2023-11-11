import { useRef } from "react";
import { PiChatFill } from "react-icons/pi";
import { useHistory } from "react-router-dom";

const ChatRoom = ({ onRoomChange }) => {
  const roomInputRef = useRef(null);
  const history = useHistory();

  const handleRoomSubmit = () => {
    const roomName = roomInputRef.current.value;
    onRoomChange(roomName); // Pass the roomName to the parent component
    history.push(`/chat/${roomName}`)
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRoomSubmit();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row lg:flex-row justify-center items-center bg-sky-200">
      <div className="w-full md:w-3/5 lg:w-3/5 flex flex-col justify-center items-center rounded-md">
        <div className="w-2/3">
          <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl">
            Enter{" "}
            <mark className="px-1 text-white bg-blue-500 rounded">
              Chat rooms
            </mark>{" "}
            , where Memories Meet Conversation.
          </h1>
        </div>
      </div>

      <div className="w-2/5 md:h-full lg:h-full flex justify-center items-center md:bg-white lg:bg-white sm:bg-sky-200">
        <div></div>
        <div className="flex flex-col">
          <div className="flex flex-row my-2">
            <p className="text-slate-900 mr-2">Join a Chat Room</p>
            <PiChatFill className="pb-2" size={25} />
          </div>
          <div className="flex flex-row ">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center">
              <input
                ref={roomInputRef}
                className="text-black py-2 px-4 border border-gray-300 rounded mb-2"
                placeholder="Enter room name"
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleRoomSubmit}
                className="bg-transparent hover:bg-slate-900 text-slate-900 font-semibold hover:text-white py-2 px-6 border border-slate-900 hover:border-transparent rounded md:ml-2 lg:ml-2 mb-2"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
