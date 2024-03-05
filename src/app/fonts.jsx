/* VH 2024 Fonts: Comfortaa (300-700) + Varela Round (400) */
import { Comfortaa, Varela_Round } from "next/font/google";

const comfortaa = Comfortaa({ subsets: ["latin"] });
const varela = Varela_Round({ subsets: ["latin"], weight: "400" });

module.exports = { comfortaa, varela };
