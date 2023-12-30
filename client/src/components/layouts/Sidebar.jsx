import React from 'react'
import {faImage, faPhotoFilm, faStar, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link,useLocation } from 'react-router-dom';
import "../../assets/css/sidebar.css"
export const Sidebar = () => {
    const location=useLocation()
  return (
    <>
    <div className="side-bar">
              <div className={`side-bar-item ${location.pathname=="/gallery" ? "side-bar-item-background":""}`}>
                  <FontAwesomeIcon icon={faImage} />
                  <Link to={"#"}>Photos</Link>
              </div>
              <div className="side-bar-item">
                  <FontAwesomeIcon icon={faStar} />
                  <Link to={"#"}>Favorites</Link>
              </div>
              <div className="side-bar-item">
                  <FontAwesomeIcon icon={faPhotoFilm} />
                  <Link to={"#"}>Albums</Link>
              </div>
              <div className="side-bar-item">
                  <FontAwesomeIcon icon={faTrash} />
                  <Link to={"#"}>Trash</Link>
              </div>
          </div>

    </>
  )
}
