import { useState } from "react";
import { Link } from "react-router-dom";
import Intro from "../components/Intro.jsx";
import FloatingFood from "../components/FloatingFood.jsx";
import MenuCard from "../components/MenuCard.jsx";

export default function Home({ menu, addToCart }) {
  const [showIntro, setShowIntro] = useState(!sessionStorage.getItem("introSeen"));

  const finishIntro = () => {
    sessionStorage.setItem("introSeen", "yes");
    setShowIntro(false);
  };

  const popular = menu.filter((item) => [4, 7, 9].includes(item.id));

  return (
    <div>
      {showIntro && <Intro onDone={finishIntro} />}

      <section className="hero">
        <FloatingFood />
        <p className="hero-small">"GOOD FOOD, GOOD MOOD, NO LIMITS."</p>
        <h1 className="hero-title">HUSSAINI'S</h1>
        <p className="hero-sub">WELCOME TO OUR WORLD OF FLAVOR</p>

        <div className="hero-buttons">
          <Link to="/menu" className="btn btn-yellow">SEE THE MENU</Link>
          <Link to="/reserve" className="btn btn-outline">BOOK A TABLE</Link>
        </div>
      </section>

      <section className="section about">
        <h2>OUR STORY</h2>
        <p>
          Hussaini's started with one simple idea: food should make people happy.
          From our family kitchen to your table, every dish is cooked fresh with love,
          bold flavors, and a little bit of magic.
        </p>
      </section>

      <section className="section">
        <h2>MOST POPULAR</h2>
        <div className="grid">
          {popular.map((item) => (
            <MenuCard key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="section events">
        <h2>PARTIES & EVENTS</h2>
        <p>Birthday parties, family dinners, corporate gatherings. We make every event special.</p>
        <Link to="/reserve" className="btn btn-yellow">BOOK AN EVENT</Link>
      </section>
    </div>
  );
}