"use client";
import { motion } from "framer-motion";

export default function Epilogue() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-10 dark:bg-black bg-white relative w-full overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full relative px-4 pb-40">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="w-full max-w-4xl mx-auto text-center mb-6"
        >
          <h2 className="text-center text-xl md:text-3xl font-bold text-black dark:text-white">
            Epilogue
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-3xl mt-2 mx-auto">
            সব কিছুই শেষ হয় যেমন, এটাও শেষ হলো <br />
            অপমানের বোঝা নিয়ে, সম্মান বেছে নিতে হলো <br />
            সব কিছুই শেষ হয় যেমন, এটাও শেষ হলো <br />
            অপমানের বোঝা নিয়ে, সম্মান বেছে নিতে হলো <br />
            <br />
            Life kept on going and lulled me with its motions, I kept rocking
            back and forth, as it threw me left and threw me right, and before I
            knew it; nobody buys yesterday's lottery ticket. I came to Tequip,
            the day you made the first big breakthrough of your career. There
            you were, anxiously waiting for the selection list and I maintained
            distance, lest I bring some bad luck to you. After a long wait, the
            list came. You were selected. You hugged all of your friends in room
            208 of Tequip and eventually turned back and smiled at me. I wanted
            to come up to you and tell you all this in person, but I just
            watched you smile. You looked beautiful. You are young, you can
            dream, and for sometime you let me into your dreams. And I want to
            thank you for that.
            <br />
            I had loved you against reason, against promise, against peace,
            against hope, against happiness, against all discouragement that
            could be. <br />
            I hope you like your choices. I like mine.
            <br />
            With affection and love, <br />
            Manas
          </p>
        </motion.div>
      </div>
      <div className="fixed inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white dark:to-black pointer-events-none select-none z-40" />
    </div>
  );
}
