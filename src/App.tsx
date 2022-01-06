import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "src/pages/Home";
import { BackgroundContext } from "src/context/backgroundContext";

function App() {
  const [backgroundColor, setBackgroundColor] = useState<string>("lightGray");

  const backgroundValue = useMemo(
    () => ({ backgroundColor, setBackgroundColor }),
    [backgroundColor]
  );

  return (
    <BackgroundContext.Provider value={backgroundValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </BackgroundContext.Provider>
  );
}

export default App;
