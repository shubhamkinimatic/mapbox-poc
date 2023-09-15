import Image from "next/image";
import { Inter } from "next/font/google";
import Mapbox from "@/components/mapbox";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <Mapbox />
    </div>
  );
}
