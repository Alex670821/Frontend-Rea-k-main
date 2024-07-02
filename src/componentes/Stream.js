import React, { useEffect } from 'react';

const Stream = () => {
  useEffect(() => {
    const videoElement = document.getElementById('liveStream');

    // Asegúrate de que el video no esté ya en reproducción antes de intentar reproducirlo
    const handlePlay = () => {
      if (!videoElement.paused) {
        videoElement.pause();
      }
      videoElement.play().catch(error => {
        console.error("Error playing video:", error);
      });
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        videoElement.srcObject = stream;
        handlePlay();
      }).catch(error => {
        console.error("Error accessing media devices:", error);
      });
    }
  }, []);

  return (
    <div>
      <h1>Live Stream</h1>
      <video id="liveStream" width="600" height="400" controls></video>
    </div>
  );
};

export default Stream;
