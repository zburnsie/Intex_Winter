import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PosterCard from '../components/PosterCard';

type Props = {
  posters: string[];
  baseUrl: string;
};

const FeaturedCarousel = ({ posters, baseUrl }: Props) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const { scrollLeft, clientWidth } = scrollContainer.current;
      scrollContainer.current.scrollTo({
        left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && scrollContainer.current) {
        scroll('right');
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section
      className="bg-black text-white py-20 px-4 relative w-full overflow-x-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 px-2">Featured Films</h3>

        {/* Scrollable Poster Row */}
        <div className="relative">
          {/* Carousel Items */}
          <div
            ref={scrollContainer}
            className="flex gap-4 overflow-x-auto scroll-smooth px-2 no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {posters.map((filename, i) => {
              const encoded = encodeURIComponent(filename);
              const imageSrc = `${baseUrl}${encoded}`;
              const altText = filename.replace(/\.[^/.]+$/, '');

              return (
                <motion.div
                  key={i}
                  style={{ display: 'inline-block', flexShrink: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <PosterCard
                    src={imageSrc}
                    alt={altText}
                    width={200}
                    height={300}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Arrows on Hover */}
          {isHovered && (
            <>
              <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 transition"
              >
                <ChevronLeft className="text-white w-6 h-6" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 transition"
              >
                <ChevronRight className="text-white w-6 h-6" />
              </button>
            </>
          )}

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
