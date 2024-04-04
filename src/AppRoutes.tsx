// TODO: move css imports to index.tsx once legacy app is cleaned up
import "./variables.css";
import "./index.css";

import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./views/Home/Home";
import { NotFound } from "./views/NotFound";
import { Sandbox } from "./views/Sandbox";
import { Lessons } from "./views/Lessons/Lessons";
import { Resources } from "./views/Resources/Resources";
import { Challenges } from "./views/Challenges/Challenges";
import { Challenge } from "./views/Challenge/Challenge";

/**
 * Kobot 2024 new design routes
 */
const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="lessons/:lessonId" element={<Challenges />} />
        <Route path="lessons/:lessonId/:challengeId" element={<Challenge />} />
        <Route path="resources" element={<Resources />} />
        <Route path="sandbox" element={<Sandbox />} />
        {/* debugging playground */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
