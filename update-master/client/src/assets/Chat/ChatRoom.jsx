/* eslint-disable react/react-in-jsx-scope */
// /* eslint-disable react/react-in-jsx-scope */
import { Common } from "@zegocloud/zimkit-react";
import { useEffect, useState } from "react";
import "@zegocloud/zimkit-react/index.css";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const id = Math.floor(Math.random() * 10000);

function ChatRoom() {
  // console.log(currentUser);
  const [state, setState] = useState({
    appConfig: {
      appID: import.meta.env.VITE_API_APPID, // The AppID you get from the ZEGOCLOUD admin console.
      serverSecret: import.meta.env.VITE_API_SERVER_SECRET_KEY, // The serverSecret you get from ZEGOCLOUD Admin Console.
    },
    //     // The userID and userName is a strings of 1 to 32 characters.
    //     // Only digits, letters, and the following special characters are supported: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'
    userInfo: {
      // Your ID as a user.
      userID: `${currentUser.user.phone}`,
      // Your name as a user.
      userName: `${currentUser.user.username}`,
      // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
      userAvatarUrl: `${currentUser.user.img}`,
    },
  });
  useEffect(() => {
    const init = async () => {
      const zimKit = new ZIMKitManager();
      const token = zimKit.generateKitTokenForTest(
        state.appConfig.appID,
        state.appConfig.serverSecret,
        state.userInfo.userID
      );
      await zimKit.init(state.appConfig.appID);
      await zimKit.connectUser(state.userInfo, token);
    };
    init();
  }, []);

  return (
    <div>
      Welcome {state.userInfo.userID}
      <Common></Common>
    </div>
  );
}
export default ChatRoom;

// import React, { useEffect } from 'react';
// import ZIM , {Commen} from 'zego-zim-web';

// const ChatRoom = () => {
//   useEffect(() => {
//     const appID = 234626847; // Note: the appID is a set of numbers, not a string.
//     ZIM.create({ appID });

//     const zim = ZIM.getInstance();

//     zim.on('error', (zim, errorInfo) => {
//       console.log('error', errorInfo.code, errorInfo.message);
//     });

//     zim.on('connectionStateChanged', (zim, { state, event, extendedData }) => {
//       console.log('connectionStateChanged', state, event, extendedData);
//       if (state === 0 && event === 3) {
//         zim.login(userInfo, token);
//       }
//     });

//     zim.on('receivePeerMessage', (zim, { messageList, fromConversationID }) => {
//       console.log('receivePeerMessage', messageList, fromConversationID);
//     });

//     zim.on('tokenWillExpire', (zim, { second }) => {
//       console.log('tokenWillExpire', second);
//       zim.renewToken(token)
//         .then(({ token }) => {
//           // Renewed successfully.
//         })
//         .catch((err) => {
//           // Renew failed.
//         });
//     });

//     const userInfo = { userID: 'akku123', userName: 'xxxx123' };
//     const token = 'xyz';

//     zim.login(userInfo, token)
//       .then(() => {
//         // Login successful.
//       })
//       .catch((err) => {
//         // Login failed.
//       });

//     const toConversationID = 'akku12'; // Peer user's ID.
//     const conversationType = 1; // Message type; 1-on- chat: 0, in-room chat: 1, group chat:2
//     const config = { priority: 1 };

//     const messageTextObj = { type: 1, message: 'Message text', extendedData: 'Message extended info(optional)' };
//     const notification = {
//       onMessageAttached: (message) => {
//         // todo: Loading
//       }
//     };

//     zim.sendMessage(messageTextObj, toConversationID, conversationType, config, notification)
//       .then(({ message }) => {
//         // Message sent successfully.
//       })
//       .catch((err) => {
//         // Failed to send a message.
//       });

//     zim.on('receivePeerMessage', (zim, { messageList, fromConversationID }) => {
//       console.log('receivePeerMessage', messageList, fromConversationID);
//     });

//     zim.logout();

//     // Clean up the ZIM instance when the component unmounts
//     return () => {
//       ZIM.destroy();
//     };
//   }, []);

//   return (
//     <>
//     <Commen></Commen>
//     </>
//   );
// };

// export default ChatRoom;
