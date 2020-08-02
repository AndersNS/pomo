interface Props {
  aboutClicked: () => void;
  settingsClicked: () => void;
}

export default function Footer({ aboutClicked, settingsClicked }: Props) {
  return (
    <footer className="footer has-background-dark">
      <nav className="level is-mobile">
        <div className="level-item">
          <a className="link is-info" onClick={aboutClicked}>
            About
          </a>
        </div>
        <div className="level-item">
          <a className="link is-info" onClick={settingsClicked}>
            Settings
          </a>
        </div>
        <div className="level-item">
          <a className="link is-info" href="https://github.com/AndersNS/pomo">
            Github
          </a>
        </div>
      </nav>
    </footer>
  );
}
