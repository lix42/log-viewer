/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const logoStyle = css`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  &.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
 }
`;

const Card = styled.div`
  padding: 2em;
`;

const ReadDocs = styled.p`
  color: #888;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} css={logoStyle} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            css={[logoStyle, css`&.react { animation: spin 20s linear infinite; }`]}
            className="react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Card>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
      <ReadDocs>Click on the Vite and React logos to learn more</ReadDocs>
    </Container>
  );
}

export default App;
