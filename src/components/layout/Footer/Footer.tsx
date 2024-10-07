import React from "react";
import {
  FaDiscord,
  FaInstagram,
  FaVk,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import scss from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <ul className={scss.links}>
          <li>
            <a href="#">Terms Of Use</a>
          </li>
          <li>
            <a href="#">Privacy-Policy</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
        </ul>
        <p className={scss.description}>
          myMovie - a unique website providing fascinating information about
          movies and TV shows. Here you can discover all the necessary details
          about your favorite films, actors, directors, ratings, and much more.
          myMovie boasts a stylish and intuitive interface that makes your
          search for cinematic masterpieces as convenient and enjoyable as
          possible.
        </p>
        <div className={scss.socialIcons}>
          <a href="#">
            <FaDiscord />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaVk />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
