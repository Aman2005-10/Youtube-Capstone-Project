import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazily load the components
const Homepage = lazy(() => import("./components/Homepage"));
const VideoPlayer = lazy(() => import("./components/VideoPlayer"));
const Form = lazy(() => import("./components/Form"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const ChannelView = lazy(() => import("./components/Channelview"));
const VideoTest = lazy(() => import("./components/VideoTest"));
const Error = lazy(() => import("./components/Error"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/form" element={<Form />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/channel/:id" element={<ChannelView />} />
          <Route path="/videos/:id" element={<VideoTest />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
