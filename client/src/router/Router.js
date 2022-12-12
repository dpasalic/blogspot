import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./routes";

// Configuration of React Router - using Browser Router

// Routes combined with appropriate components
const router = createBrowserRouter(routes);

const Router = () =>
        <RouterProvider router={router} />;

export default Router;