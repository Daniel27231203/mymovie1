import scss from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>footer</div>
      </div>
    </footer>
  );
};

export default Footer;
