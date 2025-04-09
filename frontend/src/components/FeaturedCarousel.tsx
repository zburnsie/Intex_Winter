import { motion } from 'framer-motion';
import PosterCard from '../components/PosterCard';

type Props = {
  posters: string[];
  baseUrl: string;
};

const FeaturedCarousel = ({ posters, baseUrl }: Props) => {
  // Get 50 per row
  const row1 = posters.slice(0, 50);
  const row2 = posters.slice(50, 100);

  return (
    <section className="bg-black text-white py-20 px-4 relative w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 px-2">Featured Films</h3>

        {/* Two rows, each scrolling independently */}
        {[row1, row2].map((rowData, rowIndex) => (
          <div key={rowIndex} className={`featured-row-container`}>
            <div className={`featured-row ${rowIndex === 1 ? 'slower' : ''}`}>
              {[...rowData, ...rowData].map((filename, i) => {
                const encoded = encodeURIComponent(filename);
                const imageSrc = `${baseUrl}${encoded}`;
                const altText = filename.replace(/\.[^/.]+$/, '');

                return (
                  <motion.div
                    key={`${rowIndex}-${i}`}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCarousel;
