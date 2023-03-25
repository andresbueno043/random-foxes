import { useRef, useEffect, useState } from "react";
import type { ImgHTMLAttributes } from "react";

//Extraigo los tipos y los meto dentro de una sola categoría, heredando las del elemento HTML img
type LazyImageProps = { src: string};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

const LazyImage = ({ src, ...imgProps }: Props): JSX.Element => {
  //I'm telling typescript this is a JSX Element
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  useEffect(() => {
    //New observer
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src);
        }
      });
    });

    //observe node
    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect;
    };
  }, [src]);

  return (
    <img
      ref={node}
      width={320}
      height="auto"
      className="rounded bg-gray-300"
      src={src}
      {...imgProps}
    />
  );
};

export { LazyImage };
