import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useContext } from "react";
import { ThemeContext } from "./context/theme";
import { ArticleProvider } from "./context/articles/context";
import { MatchProvider } from "./context/matches/context";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`h-screen w-full mx-auto py-2 ${
          theme === "dark" ? "dark" : ""
        } dark:bg-slate-700`}
      >
        {theme}
        <MatchProvider>
          <ArticleProvider>
            <RouterProvider router={router} />
          </ArticleProvider>
        </MatchProvider>
      </div>
    </>
  );
}

export default App;
