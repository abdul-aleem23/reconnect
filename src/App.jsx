import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useState } from "react";
import Auth from "./components/Auth";
import ChatRoom from "./components/ChatRoom";
import Chat from "./components/Chat";
import Nav from "./components/Nav";

//Cookies
import Cookies from "universal-cookie";

//SignOut
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null); //checks if the chatroom is specified.
  const [inChat, setInChat] = useState(false); // state to track if in the chat or not

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  // Function to handle room change
  const handleRoomChange = (roomName) => {
    setRoom(roomName);
  };

  return (
    <Router>
      <div>
        <Nav signOut={signUserOut} isAuth={isAuth} inChat={inChat} />
        <Switch>
          <Route
            path="/auth"
            render={() =>
              !isAuth ? <Auth setIsAuth={setIsAuth} /> : <Redirect to="/" />
            }
          />
          <Route
            path="/chat"
            render={() =>
              isAuth ? <Chat room={room} setInChat={setInChat} /> : <Redirect to="/auth" />
            }
          />
          <Route
            path="/chatroom"
            render={() =>
              isAuth ? (
                <ChatRoom onRoomChange={handleRoomChange} />
              ) : (
                <Redirect to="/auth" />
              )
            }
          />
          <Redirect from="/" to="/chatroom" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


