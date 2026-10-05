import { motion } from "framer-motion";
import image1 from "../../../photo/enhancedclient1.jpeg";
import image2 from "../../../photo/enhancedclient2.jpeg";
import image3 from "../../../photo/enhancedclient3.jpeg";
import image4 from "../../../photo/enhancedclient4.jpeg";
import image5 from "../../../photo/enhancedclient5.jpeg";
import image6 from "../../../photo/enhancedclient6.jpeg";
import image7 from "../../../photo/enhancedclient7.jpeg";
import image8 from "../../../photo/enhancedclient8.jpeg";

const TRANSFORMATION_IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
];

export default function TransformationGallery() {
  return (
    <section
      className="mt-16 border-t border-edge pt-12"
      data-testid="transformation-gallery-section"
    >
      <h3 className="text-center font-display text-4xl font-extrabold uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
        100 Days <span className="text-volt">Transformation</span>
      </h3>

      <div className="mx-auto mt-10 grid w-full grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-12 lg:w-[86%] lg:grid-cols-4">
        {TRANSFORMATION_IMAGES.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="aspect-[3/4] overflow-hidden rounded-[14px] bg-panel shadow-[0_12px_24px_rgba(0,0,0,0.28)]"
          >
            <img
              src={image}
              alt={`100 days transformation client ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}