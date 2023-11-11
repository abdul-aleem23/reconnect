import { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { formatDistanceToNow } from "date-fns";

const Chat = (props) => {
  const { room, setInChat } = props;
  const messagesRef = collection(db, "messages");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const queryMembers = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id }); //timestamp 53:00
      });
      setMessages(messages);
    });
    const membersUnsubscribe = onSnapshot(queryMembers, (snapshot) => {
      const uniqueMembers = new Set();
      snapshot.forEach((doc) => {
        const messageData = doc.data();
        if (messageData.user) {
          uniqueMembers.add(messageData.user);
        }
      });
      setMembers(Array.from(uniqueMembers));
    });
    // Set inChat to true when the component mounts
    setInChat(true);

    return () => {
      //cleaning up the useEffect.
      unsubscribe();
      membersUnsubscribe();
      setInChat(false);
    };
  }, [room, setInChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userImage: auth.currentUser.photoURL,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row lg:flex-row justify-center items-center bg-gray-100">
      <div id="left" className="w-1/2">
        <h2>Family:</h2>
        <ul>
          {members.map((member) => (
            <li key={member}>{member}</li>
          ))}
        </ul>
      </div>

      <div id="right" className="w-1/2 flex justify-center items-center">
        <div className="w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-sm bg-white rounded-lg shadow-lg p-4">
          <div className="text-lg font-bold mb-4">Chat Room: {room}</div>
          <div className="overflow-y-auto max-h-96">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col mb-2 ${
                  message.user === auth.currentUser.displayName
                    ? "items-start"
                    : "items-end"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.user === auth.currentUser.displayName
                      ? "bg-slate-200 text-black"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  <span className="font-semibold">{message.user}: </span>
                  {message.text}
                </div>
                <div
                  className={`flex items-center text-xs text-gray-500 mt-1 ml-2 self-${
                    message.user === auth.currentUser.displayName
                      ? "start"
                      : "end"
                  }`}
                >
                  {message.createdAt &&
                    formatDistanceToNow(new Date(message.createdAt.toDate()), {
                      addSuffix: true,
                    })}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row mt-4"
          >
            <input
              className="flex-grow p-2 border border-gray-300 rounded-md mb-2 sm:mb-0 sm:mr-2 focus:outline-none focus:border-slate-900"
              placeholder="Type a message"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button
              type="submit"
              className="bg-slate-900 text-white p-2 rounded-md hover:bg-slate-500 focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
