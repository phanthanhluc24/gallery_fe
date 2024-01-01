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
                  <Link to={"/gallery"}>Photos</Link>
              </div>
              <div className="side-bar-item">
                  <FontAwesomeIcon icon={faStar} />
                  <Link to={"#"}>Favorites</Link>
              </div>
              <div className={`side-bar-item ${location.pathname=="/gallery/album" ||location.pathname === "/gallery/album/:folder/:id" ? "side-bar-item-background":""}`}>
                  <FontAwesomeIcon icon={faPhotoFilm} />
                  <Link to={"/gallery/album"}>Albums</Link>
              </div>
              <div className={`side-bar-item ${location.pathname=="/gallery/trash" ? "side-bar-item-background":""}`}>
                  <FontAwesomeIcon icon={faTrash} />
                  <Link to={"/gallery/trash"}>Trash</Link>
              </div>
          </div>

    </>
  )
}
