import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Schedule, Resources, Workshops, NotFound } from "src/app/views";
import { Nav, Redirect } from "src/app/components";

const App = () => (
	<div className="App">
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/resources" element={<Resources />} />
				<Route path="/workshops" element={<Workshops />} />
				<Route path='/devpost' element={<Redirect url="https://venushacks-2023.devpost.com/" />} />
				<Route path='/report' element={<Redirect url="https://forms.gle/xzPqKT4YgSWWdRqv8" />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</div>
);

export default App;
