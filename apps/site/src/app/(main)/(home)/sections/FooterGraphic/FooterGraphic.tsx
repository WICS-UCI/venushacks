import Image from "next/image";
import pond from "./assets/Pond.svg";
import rainbow from "./assets/Rainbow.svg";
import ant from "./assets/Ant.svg";
import basket from "./assets/PicnicBasket.svg";
import yellow from "./assets/HappyYellowCapy.svg"
import green from "./assets/HappyGreenCapy.svg";
import float from "./assets/HappyFloatingCapy.svg";
import apple from "./assets/Apple.svg";
import orange from "./assets/HappyOrange.svg";
import splash from "./assets/WaterSplash.svg";
import ant2 from "./assets/Ant2.svg";
import blue from "./assets/HappyBlueCapy.svg";
import red from "./assets/HappyRedCapy.svg";
import cherry from "./assets/Cherries.svg";
import shadow from "./assets/Shadows.svg";

const FooterGraphic = () => {
	return (
		<section className="relative flex w-full aspect-[1280/1000]">
            <Image
                src={shadow}
                alt="Shadows"
                className={"absolute left-[49%] top-[67%] w-[90%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={rainbow}
                alt="Rainbow"
                className={"absolute left-[40%] top-[35%] w-[50%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={pond}
                alt="Pond"
                className={"absolute left-1/2 top-1/2  w-[80%] -translate-x-1/2 -translate-y-1/2"}
            />
            <div>
                <Image
                    src={float}
                    alt="Floating Capybara"
                    className={"absolute left-[58%] top-[42%] w-[17%] -translate-x-1/2 -translate-y-1/2"}
                />
                <Image
                    src={apple}
                    alt="Apple"
                    className={"absolute left-[58.5%] top-[34%] w-[3.5%] -translate-x-1/2 -translate-y-1/2"}
                />
            </div>
            <Image
                src={yellow}
                alt="Yellow Capybara"
                className={"absolute left-[67%] top-[63%] w-[17%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={green}
                alt="Green Capybara"
                className={"absolute left-[86%] top-[54%] w-[18%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={basket}
                alt="basket"
                className={"absolute left-[80%] top-[68%] w-[13%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={ant}
                alt="ant1"
                className={"absolute left-[90%] top-[70%] w-[15%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={orange}
                alt="Orange Capybara"
                className={"absolute left-[38%] top-[50%] w-[18%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={splash}
                alt="Splash"
                className={"absolute left-[40%] top-[52%] w-[26%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={ant2}
                alt="Ant2"
                className={"absolute left-[11%] top-[47%] w-[12%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={blue}
                alt="Blue Capybara"
                className={"absolute left-[20%] top-[60%] w-[19%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={red}
                alt="Red Capybara"
                className={"absolute left-[32%] top-[72%] w-[24%] -translate-x-1/2 -translate-y-1/2"}
            />
            <Image
                src={cherry}
                alt="Cherry"
                className={"absolute left-[41%] top-[69%] w-[5%] -translate-x-1/2 -translate-y-1/2"}
            />

		</section>
	);
};

export default FooterGraphic;
