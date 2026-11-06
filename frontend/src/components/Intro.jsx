// Full-screen welcome animation with a Skip button (like Diverxo's intro video)
import { useEffect } from "react"; // hook to run a timer
import FloatingFood from "./FloatingFood.jsx"; // floating food animation

// props: onDone (function to hide the intro)
function Intro({ onDone }) {
  // close the intro by itself after 6 seconds
  useEffect(() => {
    const timer = setTimeout(onDone, 6000); // start timer
    return () => clearTimeout(timer); // stop timer if intro closes early
  }, [onDone]);

  return (
    <div className="intro">
      {/* food floating in the background */}
      <FloatingFood />

      {/* big animated texts */}
      <p className="intro-small">FLAVOR OR NOTHING</p>
      <h1 className="intro-title">HUSSAINI'S</h1>
      <p className="intro-small">WELCOME TO A WORLD OF TASTE</p>

      {/* skip button */}
      <button className="skip-btn" onClick={onDone}>
        SKIP INTRO
      </button>
    </div>
  );
}

// share Intro with Home.jsx
export default Intro;
