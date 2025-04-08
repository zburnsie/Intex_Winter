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
      className="bg-black text-white py-16 px-4 relative w-full overflow-x-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="text-3xl font-bold">Featured Films</h3>
          <div className="space-x-2 hidden md:flex">
            <button
              onClick={() => scroll('left')}
              className="p-2 bg-white/10 rounded hover:bg-white/20"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 bg-white/10 rounded hover:bg-white/20"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Scrollable Poster Row */}
        <div className="relative">
          <div
            ref={scrollContainer}
            className="flex gap-4 overflow-x-auto scroll-smooth px-2 no-scrollbar relative z-10"
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

          {/* Left & Right Gradient Overlays */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
