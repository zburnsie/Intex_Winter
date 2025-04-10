type PosterCardProps = {
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
  width?: number;
  height?: number;
};

const PosterCard = ({
  src,
  alt,
  onClick,
  className = '',
  width = 300,
  height = 450,
}: PosterCardProps) => {
  return (
    <div
      className={`relative rounded overflow-hidden bg-black shadow-lg group transition-transform duration-300 hover:scale-105 ${className}`}
      onClick={onClick}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        cursor: onClick ? 'pointer' : 'default',
        flexShrink: 0, // ✅ this is crucial to keep it horizontal
        display: 'inline-block', // ✅ ensures inline stacking in flex
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        onError={(e) => {
          e.currentTarget.src = '/default-poster.jpg';
        }}
      />
      {/* Optional hover overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
        <p className="text-white font-semibold text-sm">Watch Now</p>
      </div>
    </div>
  );
};

export default PosterCard;
