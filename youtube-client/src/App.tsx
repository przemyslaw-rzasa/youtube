import * as React from "react";

import { Header } from "./components/Header/Header";
import { YoutubeProvider } from "./YoutubeProvider";

import "./App.scss";

function App() {
  return (
    <YoutubeProvider>
      <div className="youtube">
        <div className="youtube__main">
          <Header />
        </div>
      </div>
    </YoutubeProvider>
  );
}

export default App;
