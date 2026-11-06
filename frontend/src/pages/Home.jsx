// Home page: intro animation, big title, and popular dishes
import { useState } from "react"; // hook for state
import { Link } from "react-router-dom"; // links to other pages
import Intro from "../components/Intro.jsx"; // welcome animation
import FloatingFood from "../components/FloatingFood.jsx"; // floating food
import MenuCard from "../components/MenuCard.jsx"; // food card

// props: menu (all items), addToCart (function)
function Home({ menu, addToCart }) {
  // show the intro only the first time in this browser tab
  const [showIntro, setShowIntro] = useState(!sessionStorage.getItem("introSeen"));

  // hide the intro and remember it was seen
  function finishIntro() {
    sessionStorage.setItem("introSeen", "yes"); // remember
    setShowIntro(false); // hide
  }

  // pick 3 popular items to show (by id)
  const popular = menu.filter((item) => [4, 7, 9].includes(item.id));

  return (
    <div>
      {/* intro shows on top of the page until skipped (conditional rendering) */}
      {showIntro && <Intro onDone={finishIntro} />}

      {/* HERO: big red section with floating food */}
      <section className="hero">
        <FloatingFood />
        <p className="hero-small">"GOOD FOOD, GOOD MOOD, NO LIMITS."</p>
        <h1 className="hero-title">HUSSAINI'S</h1>
        <p className="hero-sub">WELCOME TO OUR WORLD OF FLAVOR</p>

        {/* buttons to the main pages */}
        <div className="hero-buttons">
          <Link to="/menu" className="btn btn-yellow">SEE THE MENU</Link>
          <Link to="/reserve" className="btn btn-outline">BOOK A TABLE</Link>
        </div>
      </section>

      {/* ABOUT section */}
      <section className="section about">
        <h2>OUR STORY</h2>
        <p>
          Hussaini's started with one simple idea: food should make people happy.
          From our family kitchen to your table, every dish is cooked fresh with love,
          bold flavors and a little bit of magic.
        </p>
      </section>

      {/* POPULAR dishes, list rendering with map */}
      <section className="section">
        <h2>MOST POPULAR</h2>
        <div className="grid">
          {popular.map((item) => (
            <MenuCard key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* EVENTS section */}
      <section className="section events">
        <h2>PARTIES & EVENTS</h2>
        <p>Birthday parties, family dinners, corporate gatherings. We make every event special.</p>
        <Link to="/reserve" className="btn btn-yellow">BOOK AN EVENT</Link>
      </section>
    </div>
  );
}

// share Home with App.jsx
export default Home;
