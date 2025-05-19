import { Footer } from "src/app/components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
	Home,
	Schedule,
	Resources,
	Workshops,
	NotFound,
	ComingSoon,
	Apply,
} from "src/app/views";
import { Nav, Redirect } from "src/app/components";

const App = () => (
	<div className="App">
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/apply" element={<Apply />} /> */}
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/workshops" element={<Workshops />} />
				<Route
					path="/feedback"
					element={
						<Redirect url="https://docs.google.com/forms/d/e/1FAIpQLSfG3Xh0U5lajLFHt6mhqgfGNartbXy1cQX71IEOz3TV5n-y4A/viewform?usp=preview" />
					}
				/>
				<Route
					path="/report"
					element={<Redirect url="https://forms.gle/nvS7UQbGjceuxhU96" />}
				/>
				{/* /* <Route path="/resources" element={<Resources />} /> */}
				<Route
					path="/devpost"
					element={<Redirect url="https://venus-hacks-2025.devpost.com" />}
				/>
				{/* <Route path='/hackers-choice' element={<Redirect url="https://docs.google.com/forms/d/e/1FAIpQLSdpBIi6cxLu9m_b8qQoA8GfLMMJ_cIV7HuVbIjH7nHtPQljGg/viewform" />} /> */}
				{/* <Route path='/midway' element={<Redirect url="https://docs.google.com/forms/d/e/1FAIpQLSdObzMrHpTjjcc5DhdXmuX8v485aDhsCqBRxCV3R66316htcg/viewform" />} /> */}
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	</div>
);

export default App;
