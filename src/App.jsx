import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Schedule, Resources, Workshops, NotFound } from "src/app/views";

// import { Nav } from "src/app/components";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <NotFound />,
	},
	{
		path: "/schedule",
		element: <Schedule />,
	},
	{
		path: "/resources",
		element: <Resources />,
	},
	{
		path: "/workshops",
		element: <Workshops />,
	},
]);

function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
