import "../styles/navbar.css";
import "../assets/dev.png";
import "../assets/editing.png";
import "../assets/design.png";

export default function Navbar() {
  
  return (
    <div className="NavbarHeader">
      <div className="navItem" id="devbox">
        <img className="navImg" id="dev" src="../assets/dev.png" alt="dev section" />
      </div>

      <div className="navItem" id="editingbox">
        <img className="navImg" id="editing" src="../assets/editing.png" alt="editing section" />
      </div>

      <div className="navItem" id="designbox">
        <img className="navImg" id="design" src="../assets/design.png" alt="design section" />
      </div>
    </div>
  );
}