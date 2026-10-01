import { motion } from "framer-motion";
import image1 from "../../../photo/Enhancedimage1.jpeg";
import image2 from "../../../photo/Enhancedimage2.jpeg";
import image3 from "../../../photo/Enhancedimage3.jpeg";
import image4 from "../../../photo/Enhancedimage4.jpeg";
import image5 from "../../../photo/Enhancedimage5.jpeg";
import image6 from "../../../photo/Enhancedimage6.jpeg";
import image7 from "../../../photo/Enhancedimage7.jpeg";
import image8 from "../../../photo/Enhancedimage8.jpeg";

const GYM_IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
];

export default function GymGallery() {
  return (
    <section
      className="px-4 py-8 sm:px-8 lg:px-16 lg:py-12"
      data-testid="gym-gallery-section"
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-center font-display text-4xl font-extrabold uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
          Inside Our Gym
        </h2>

        <div className="mx-auto mt-10 grid w-full grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-12 lg:w-[86%] lg:grid-cols-4">
          {GYM_IMAGES.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="aspect-[16/9] overflow-hidden rounded-[14px] shadow-[0_12px_24px_rgba(0,0,0,0.28)]"
            >
              <img
                src={image}
                alt={`Inside the gym, view ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}