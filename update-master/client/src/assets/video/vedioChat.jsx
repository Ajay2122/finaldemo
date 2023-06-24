import React, { useEffect, useRef } from "react";
import ZegoExpressEngine from "zego-express-engine-webrtc";

function VideoChat() {
  const videoRef = useRef(null);

  useEffect(() => {
    const zg = new ZegoExpressEngine(
      import.meta.env.VITE_ROOM_APPID,
      import.meta.env.VITE_VIDEO_CHAT
    );
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}

export default VideoChat;
