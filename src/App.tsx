import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useContext } from "react";
import { ThemeContext } from "./context/theme";
import { ArticleProvider } from "./context/articles/context";
import { MatchProvider } from "./context/matches/context";
import { TeamProvider } from "./context/Teams/context";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`w-full py-2 ${
          theme === "dark" ? "dark" : ""
        } dark:bg-slate-700`}
      >
        <TeamProvider>
          <MatchProvider>
            <ArticleProvider>
              <RouterProvider router={router} />
            </ArticleProvider>
          </MatchProvider>
        </TeamProvider>
      </div>
    </>
  );
}

export default App;
