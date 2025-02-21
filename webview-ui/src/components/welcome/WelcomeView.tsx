import getOs from "../../utilities/getOs";
import { RiChatNewLine } from "react-icons/ri";
import { GrHistory } from "react-icons/gr";
import "../../styles/WelcomeView.css";
import welcomePrompt from "./welcomePrompt";

function WelcomeView() {
  const os = getOs();
  const language = "ko";
  const languagePrompt = welcomePrompt[language];

  return (
    <div className="description">
      <p className="how-to-start-title">
        <strong>{languagePrompt.howToStart}</strong>
      </p>
      <ol className="steps">
        {languagePrompt.steps.map((step, index) => (
          <li key={index}>
            {index === 3 || index === 5 ? step.replace("{key}", os === "windows" ? "Ctrl + ⏎" : "⌘ + ⏎") : step}
          </li>
        ))}
      </ol>
      <p className="additional-info">
        <strong className="spacing1">
          <RiChatNewLine />
        </strong>{" "}
        <span className="spacing1">{languagePrompt.newChat}</span>
        <br />
        <strong className="spacing2">
          <GrHistory />
        </strong>{" "}
        <span className="spacing2">{languagePrompt.chatHistory}</span>
      </p>
    </div>
  );
}

export default WelcomeView;
