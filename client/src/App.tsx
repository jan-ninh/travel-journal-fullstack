// src\App.tsx
import { BrowserRouter, Routes, Route } from "react-router";
import { RootLayout, RequireAuth, RejectAuth } from "@/layouts";
import {
  CreatePost,
  EditPost,
  Home,
  Login,
  NotFound,
  Post,
  Register,
} from "@/pages";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />

        {/* logged-in users should NOT see login/register */}
        <Route element={<RejectAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="create" element={<CreatePost />} />
          <Route path="edit/:id" element={<EditPost />} />
        </Route>

        <Route path="post/:id" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
