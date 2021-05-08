import React from "react";

import Header from "./Components/Header/Header";
import SideNavigation from "./Components/Sidenav/Sidenav";

// import Chart from "./Components/Chart";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Components/Routes";
import { ContextProvider } from "./Components/Data/Context";

function App() {
  return (
    <ContextProvider>
      <Router>
        <SideNavigation />
        <div className="main">
          <Header />
          <Routes />
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
