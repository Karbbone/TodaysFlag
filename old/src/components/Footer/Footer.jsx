import githubLogo from "../../assets/github-original.svg";

function Footer() {
  return (
    <footer id="footer">
      <div className="flex flex-center">
        <p>Fait par Karbbone (Clément)</p>
        <a href="https://github.com/Karbbone">
          <img src={githubLogo} className="logo-github-footer" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
