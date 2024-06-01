"use client";
import Link from "next/link";
import { Pointer, Stars } from "@/components/Svg";
import styles from "@/components/animecard.module.css";
import React, { useEffect, useRef } from "react";

// type AchievementCardProps = {
//   title?: string;
//   description?: string;
//   icon: StaticImageData ;
// };

const AnimeCard: React.FC<any> = ({props }) => {
  const card = useRef<HTMLElement>(null);
  const update = (event: React.MouseEvent<HTMLDivElement>) => {
    if (card.current) {
      const proximity = 40;
      const cardBounds = card.current.getBoundingClientRect();
      if (
        event?.clientX > cardBounds.left - proximity &&
        event?.clientX < cardBounds.left + cardBounds.width + proximity &&
        event?.clientY > cardBounds.top - proximity &&
        event?.clientY < cardBounds.top + cardBounds.height + proximity
      )
        card.current.style.setProperty("--active", "1");
      else card.current.style.setProperty("--active", "0");

      const CARD_CENTER = [
        cardBounds.left + cardBounds.width * 0.5,
        cardBounds.top + cardBounds.height * 0.5,
      ];
      let ANGLE =
        (Math.atan2(
          event?.clientY - CARD_CENTER[1],
          event?.clientX - CARD_CENTER[0]
        ) *
          180) /
        Math.PI;
      ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
      card.current.style.setProperty("--start", `${ANGLE + 90}`);
    }
  };
  return (
    <article
      className={`${styles.article} h-[25rem] overflow-hidden p-[4px] w-[18rem]  rounded-[12px] flex flex-col flex-wrap relative`}
      ref={card}
      onMouseMove={update}
    >
      <div
        className={`${styles.glows} pointer-events-none absolute  inset-0 blur-[20px] text-white`}
      ></div>

      
        <div className="group relative h-full cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
          <div className="h-[100%]">
            <img
              className="h-[100%] w-full object-cover transition-transform duration-500  group-hover:scale-125"
              src={props.image}
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
          <div className="absolute inset-0 flex translate-y-[50%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
            <div className="font-dmserif text-2xl font-bold text-white">
              {props.title}
            </div>
            <p className="mb-3 flex flex-col gap-[5px] text-md italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            
             {props.genres.map((genre:string, index:number) => (
                <span key={index} className="inline-block border-white border-[1px]  rounded-full px-3 py-1 text-[10px] font-semibold text-white ">
                  {genre}
                </span>
              ))}
            </p>
           
          </div>
     
        
      </div>
      
    </article>
  );
};
export default AnimeCard;
