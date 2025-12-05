import { useState } from "react";
import Home from "./pages/Home";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import "./styles.css";
import "./colors.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <SplashScreen onFinish={() => setLoading(false)} />
  ) : (
    <Home />
  );
}
