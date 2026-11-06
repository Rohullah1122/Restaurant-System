// Bottom info shown on every page (typewriter style like Diverxo)
function Footer() {
  return (
    <footer className="footer">
      {/* left side: links */}
      <div>
        <p>PRIVACY POLICY</p>
        <p>FAQS</p>
        <p>INSTAGRAM</p>
      </div>

      {/* middle: small food icons */}
      <div className="footer-icons">🍕🍔🧁</div>

      {/* right side: address and contact */}
      <div className="footer-right">
        <p>812 Windbury street SW Airdrie</p>
        <p>INFO@HUSSAINIS.COM</p>
        <p>4034378241</p>
      </div>
    </footer>
  );
}

// share Footer with App.jsx
export default Footer;
