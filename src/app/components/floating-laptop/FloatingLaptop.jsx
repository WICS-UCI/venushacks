import laptop from "/assets/images/vh-laptop.png";
import "./FloatingLaptop.scss";

// TODO Redo this animation natively or in Framer Motion
// const Container = Keyframes.Spring(async next => {
//   while (true) {
//     let prev = 0;
//     let prevDegree = -3;
//     for (let i = 0; i < 10; i++) {
//       let randomHeight = Math.floor(Math.random() * 20)
//       let randomDegree = i % 1 === 0 ? prevDegree * -1 : prevDegree;
//       await next({
//         from: { height: prev, degree: prevDegree},
//         to: { height: i === 9 ? 0 : randomHeight, degree: randomDegree}
//       });
//       prev = randomHeight;
//       prevDegree = randomDegree;
//     }
//   }
// })

const FloatingLaptop = () => {
	// const image = ({height, degree}) => (
	//   <img
	//     src={hat}
	//     className="floating-laptop"
	//     alt="floating laptop"
	//     style={{
	//       transform: interpolate([height, degree], (h, d) => `translateY(${h - 10}px) rotate(-50deg)`),
	//       transformOrigin: 'top center',
	//     }}
	//   />
	// );

	return (
		// <Container
		//   reset
		//   native
		//   config={{ duration: 1000 }}
		// >
		//   {image}
		// </Container>
		<img src={laptop} className="floating-laptop" alt="Floating Laptop" />
	);
};

export default FloatingLaptop;
