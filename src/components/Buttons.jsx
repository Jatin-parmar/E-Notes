// import React, { createContext, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { faSun } from "@fortawesome/free-solid-svg-icons";
// import { faMoon } from "@fortawesome/free-solid-svg-icons";
// import Home from "./Home";
// import Note from "./Note";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// const data = createContext();

// function Buttons() {
//   const navigate = useNavigate();
//   const [isNotesActive, setIsNotesActive] = useState(false);
//   const location = useLocation();
//   const handleMenuClick = () => {
//     if (isNotesActive) {
//       navigate("/notes");
//     } else {
//         if (location.pathname !== "/") {
//             navigate("/");
//           }
//         else{
//             navigate("/notes");
//         }
//     }
//     setIsNotesActive((prevState) => !prevState);
//   };

//   const handleCloseClick = () => {
//     window.close();
//   };

//   const handleMouseDown = (event) => {
//     event.preventDefault();
//   };

//   const [temp, setTemp] = useState("");

//   function handleThemeEvent() {
//     if (temp === "") {
//       setTemp("dark-");
//     } else {
//       setTemp("");
//     }
//   }

//   return (
//     <div>
//       <data.Provider value={temp}>
//         <div className={`${temp}container`}>
//           <button className={`${temp}theme-button`} onClick={handleThemeEvent}>
//             <button className={`${temp}circle-button`}>
//               <FontAwesomeIcon
//                 icon={temp === "" ? faSun : faMoon}
//                 color={temp === "dark-" ? "black" : "white"}
//                 style={{ marginRight: "1px" }}
//               />
//             </button>
//           </button>
//           <button className="cancel-button" onClick={handleCloseClick}>
//             <FontAwesomeIcon icon={faTimes} color="black" />
//           </button>
//           <button className={`${temp}menu`} onClick={handleMenuClick} style={{ userSelect: "none" }} onMouseDown={handleMouseDown}>
//             <FontAwesomeIcon icon={faBars} color={temp === "dark-" ? "white" : "black"} />
//           </button>
//           <h2 onMouseDown={handleMouseDown}>Made With<span role="img" aria-label="Heart" style={{ color: "red", marginRight:"4px", marginLeft:"4px"}}>❤️</span> By Jappy</h2>
//           <Home />
//           <div>
//           </div>
//         </div>
//       </data.Provider>
//     </div>
//   );
// }

// export default Buttons;
// export { data };

import React, { createContext, useState } from "react";
import { useNavigate, useLocation, useEffect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import Home from "./Home";
import { saveNotes } from "./storage";
import { loadNotes } from "./storage";
import Note from "./Note";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const data = createContext();

function Buttons() {
  const navigate = useNavigate();
  const [isNotesActive, setIsNotesActive] = useState(false);
  const location = useLocation();


  const handleMenuClick = () => {
    if (isNotesActive) {
      navigate("/notes");
    } else {
        if (location.pathname !== "/") {
            navigate("/");
          }
        else{
            navigate("/notes");
        }
    }
    setIsNotesActive((prevState) => !prevState);
  };

  const handleCloseClick = () => {
    window.close();
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const [temp, setTemp] = useState("");

  function handleThemeEvent() {
    if (temp === "") {
      setTemp("dark-");
    } else {
      setTemp("");
    }
  }

  return (
    <div>
      <data.Provider value={temp}>
        <div className={`${temp}container`}>
          <button className={`${temp}theme-button`} onClick={handleThemeEvent}>
            <button className={`${temp}circle-button`}>
              <FontAwesomeIcon
                icon={temp === "" ? faSun : faMoon}
                color={temp === "dark-" ? "black" : "white"}
                style={{ marginRight: "1px" }}
              />
            </button>
          </button>
          <button className="cancel-button" onClick={handleCloseClick}>
            <FontAwesomeIcon icon={faTimes} color="black" />
          </button>
          <button className={`${temp}menu`} onClick={handleMenuClick} style={{ userSelect: "none" }} onMouseDown={handleMouseDown}>
            <FontAwesomeIcon icon={faBars} color={temp === "dark-" ? "white" : "black"} />
          </button>
          <h2 onMouseDown={handleMouseDown}>Made With<span role="img" aria-label="Heart" style={{ color: "red", marginRight:"4px", marginLeft:"4px"}}>❤️</span> By Jappy</h2>
          <Home />
          <div>
          </div>
        </div>
      </data.Provider>
    </div>
  );
}

export default Buttons;
export { data };
