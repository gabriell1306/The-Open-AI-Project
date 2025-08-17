import { TypeAnimation } from "react-type-animation";

export const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "Talk. Create. Discover.",
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        "Your AI, Your Rules.",
        2000,
        "Instant Answers. Zero Delay.",
        1500,
      ]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};
