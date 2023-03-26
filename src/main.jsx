import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/main.css";
import { ChakraProvider } from "@chakra-ui/react";
import { StateProvider } from "./context/Chatprovider";
import reducer, { initialState } from "./context/reducer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <ChakraProvider>
      <div className="app">
        <App />
      </div>
    </ChakraProvider>
  </StateProvider>
);
