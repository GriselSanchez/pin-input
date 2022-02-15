import React, { useState } from "react";

import "./styles.css";
import Pin from "./Pin";

export default function App() {
  const [pinValues, setPinValues] = useState<(number | undefined)[]>([]);

  return (
    <div className="App">
      <Pin pinValues={pinValues} setPinValues={setPinValues} />
    </div>
  );
}
