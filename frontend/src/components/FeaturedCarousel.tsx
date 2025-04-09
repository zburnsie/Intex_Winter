import { motion } from 'framer-motion';
import PosterCard from '../components/PosterCard';

type Props = {
  posters: string[];
  baseUrl: string;
};

const FeaturedCarousel = ({ posters, baseUrl }: Props) => {
  return (
    <section
      style={{ marginTop: '5px' }}
      className="bg-black text-white py-20 px-4 relative w-full overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 px-2">Featured Films</h3>

        {/* Two Auto-Scrolling Poster Rows */}
        <div className="space-y-6">
          {[0, 1].map((row) => (
            <div
              key={row}
              className={`flex gap-4 overflow-hidden whitespace-nowrap px-2 relative w-full
                ${row === 0 ? 'animate-scrollFast' : 'animate-scrollSlow'}`}
              style={{ minWidth: '150%' }} // critical to allow scroll
            >
              {posters.slice(row * 6, (row + 1) * 6).map((filename, i) => {
                const encoded = encodeURIComponent(filename);
                const imageSrc = `${baseUrl}${encoded}`;
                const altText = filename.replace(/\.[^/.]+$/, '');

                return (
                  <motion.div
                    key={`${row}-${i}`}
                    style={{ display: 'inline-block', flexShrink: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.02 }}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
