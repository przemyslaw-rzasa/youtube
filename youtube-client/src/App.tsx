import * as React from "react";

import { YoutubeProvider } from "./YoutubeContext";
import { MainPage } from "./pages/MainPage/MainPage";

import "./App.scss";

function App() {
  return (
    <YoutubeProvider>
      <MainPage />
    </YoutubeProvider>
  );
}

export default App;
