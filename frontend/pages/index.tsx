import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => (
  <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <Head>
      <title>l&apos;échanger</title>
      <meta name="description" content="Currency conversion web app" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>

    <header style={{ textAlign: "center", padding: "1rem 0" }}>
      <h1>
        Welcome to <strong>l&apos;échanger</strong>
      </h1>
    </header>

    <main
      style={{
        padding: "1rem 0",
        flex: 1,
        backgroundColor: "#51395f",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "3rem"
      }}
    >
      {Array(10)
        .fill("")
        .map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>#content</div>
        ))}
    </main>

    <footer
      style={{
        padding: "1rem 0",
        color: "#fff",
        backgroundColor: "#000",
        textAlign: "center",
        fontSize: "0.75rem"
      }}
    >
      <a
        href="https://github.com/michalszabo/lechanger"
        target="_blank"
        rel="noopener noreferrer"
      >
        &copy;Michal Szabo
      </a>
    </footer>
  </div>
);

export default Home;
