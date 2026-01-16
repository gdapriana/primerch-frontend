"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductImages({
  cover,
  gallery,
}: {
  cover?: string | null;
  gallery?: { url: string | null }[];
}) {
  const [slidesLink, setActiveSlidesLink] = useState<string | null>(null);

  useEffect(() => {
    if (cover) setActiveSlidesLink(cover);
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-stretch gap-2">
      <Image
        priority={true}
        src={
          slidesLink ||
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="cover"
        width={1000}
        height={1000}
      />
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {cover && gallery && gallery.length !== 0 && (
          <div className="w-full aspect-square border">
            <Image
              onClick={() => setActiveSlidesLink(cover)}
              loading="lazy"
              width={100}
              height={100}
              className="w-full h-full object-cover"
              src={cover}
              alt="gallery"
            />
          </div>
        )}
        {gallery &&
          gallery.length !== 0 &&
          gallery.map((image: { url: string | null }, index: number) => {
            return (
              image.url && (
                <div key={index} className="w-full aspect-square border">
                  <Image
                    loading="lazy"
                    onClick={() => setActiveSlidesLink(image.url)}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    src={image.url}
                    alt="gallery"
                  />
                </div>
              )
            );
          })}
      </div>
    </div>
  );
}
