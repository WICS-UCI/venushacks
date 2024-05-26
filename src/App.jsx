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
				<Route
					path="/devpost"
					element={<Redirect url="https://venushacks-2024.devpost.com/" />}
				/>
				{/* <Route path='/hackers-choice' element={<Redirect url="https://docs.google.com/forms/d/e/1FAIpQLSdpBIi6cxLu9m_b8qQoA8GfLMMJ_cIV7HuVbIjH7nHtPQljGg/viewform" />} /> */}
				{/* <Route path='/midway' element={<Redirect url="https://docs.google.com/forms/d/e/1FAIpQLSdObzMrHpTjjcc5DhdXmuX8v485aDhsCqBRxCV3R66316htcg/viewform" />} /> */}
				<Route
					path="/report"
					element={<Redirect url="https://forms.gle/x9uFYYzJe7pRsZt47" />}
				/>
				<Route
					path="/feedback"
					element={<Redirect url="https://forms.gle/CymjHWYq28kVDty68" />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</div>
);

export default App;
