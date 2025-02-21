import getOs from "../../utilities/getOs";
import { RiChatNewLine } from "react-icons/ri";
import { GrHistory } from "react-icons/gr";
import "../../styles/WelcomeView.css";

function WelcomeView() {
  const os = getOs();

  return (
    <div className="description">
      <p className="how-to-start-title">
        <strong>How to Start</strong>
      </p>
      <ol className="steps">
        <li>1. Open the source code file you are working on.</li>
        <li>2. Enter the problem definition you want to solve.</li>
        <li>3. Enter the process of solving the problem step by step.</li>
        {os === "windows" ? (
          <li>
            4. Press <kbd>ctrl + ⏎</kbd> to run.
          </li>
        ) : (
          <li>
            4. Press <kbd>⌘ + ⏎</kbd> to run.
          </li>
        )}
        <li>5. After the guiding questions are generated, ask additional questions if needed</li>
        {os === "windows" ? (
          <li>
            6. Press <kbd>ctrl + ⏎</kbd> again to run.
          </li>
        ) : (
          <li>
            6. Press <kbd>⌘ + ⏎</kbd> again to run.
          </li>
        )}
      </ol>
      <p className="additional-info">
        <strong className="spacing1">
          <RiChatNewLine />
        </strong>{" "}
        <span className="spacing1">New Chat</span>
        <br />
        <strong className="spacing2">
          <GrHistory />
        </strong>{" "}
        <span className="spacing2">Chat History</span>
      </p>
    </div>
  );
}

export default WelcomeView;
