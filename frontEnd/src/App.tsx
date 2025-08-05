import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      App
      <div>
        <Link to={"/dashboard/32432"}>go home</Link>
      </div>
    </div>
  );
};

export default App;
