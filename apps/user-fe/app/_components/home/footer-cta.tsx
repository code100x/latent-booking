"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

import { IMAGES } from "@/app/_assets";
import { FloatingElement } from "@/app/_components/parallax-floating";
import Floating from "@/app/_components/parallax-floating";

const FooterCta = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    );
  }, []);

  return (
    <section className="w-full px-4 md:px-6">
      <div
        className="flex w-full h-full justify-center items-center bg-[neutral-900] border border-neutral-800 overflow-hidden relative min-h-[500px] rounded-3xl"
        ref={scope}
      >
        <motion.div
          className="z-50 text-center space-y-4 items-center flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.88, delay: 1.5 }}
        >
          <p className="text-xl z-50 hover:scale-110 transition-transform bg-white text-black rounded-full px-4 py-2 w-fit cursor-pointer">
            Download App
          </p>
        </motion.div>

        <Floating sensitivity={-1} className="overflow-hidden">
          <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={IMAGES.hero1.src}
              className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 rounded-lg duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[10%] left-[32%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={IMAGES.hero2.src}
              className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-105 rounded-lg duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[2%] left-[53%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={IMAGES.hero3.src}
              className="w-28 h-40 md:w-40 md:h-52 object-cover hover:scale-105 rounded-lg duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[0%] left-[83%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={IMAGES.hero3.src}
              className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 rounded-lg duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>

          <FloatingElement depth={1} className="top-[40%] left-[2%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={IMAGES.hero2.src}
              className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 rounded-lg duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[70%] left-[77%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={IMAGES.hero2.src}
              className="w-28 h-28 md:w-36 md:h-48 object-cover hover:scale-105 rounded-lg duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>

          <FloatingElement depth={4} className="top-[73%] left-[15%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={IMAGES.hero2.src}
              className="w-40 md:w-52 h-full object-cover hover:scale-105 rounded-lg duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[80%] left-[50%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={IMAGES.hero2.src}
              className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 rounded-lg duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>
        </Floating>
      </div>
    </section>
  );
};

export default FooterCta;
