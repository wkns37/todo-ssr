import { hydrateRoot } from "react-dom/client";
import App from "./app";

const root = document.getElementById("root");
hydrateRoot(root, <App />);
