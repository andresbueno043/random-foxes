import { useState } from "react";
import type { MouseEventHandler } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { LazyImage } from "@/components/LazyImage";
import { type } from "os";
import { random } from "lodash";

const myRandom = () => random(1, 123);

const inter = Inter({ subsets: ["latin"] });

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newImageItem: ImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${myRandom()}.jpg`,
    };

    setImages([...images, newImageItem]);
    window.plausible("add_fox");
  };

  return (
    <>
      <Head>
        <title>Random Foxes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <main className="text-center content-center">
        <h1 className="p-4 text-3xl font-bold underline">
          Random Fox Generator!
        </h1>
        <button
          onClick={addNewFox}
          className="bg-red-500 p-4 border border-slate-900 rounded"
        >
          {" "}
          Add new fox{" "}
        </button>
        <div className="flex flex-col items-center">
          {images.map((image) => (
            <div key={image.id} className="p-4">
              <LazyImage src={image.url} onClick={() => console.log("Hey")} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
