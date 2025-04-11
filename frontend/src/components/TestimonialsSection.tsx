const TestimonialsSection = () => {
    return (
      <section className="py-16 bg-black w-full overflow-x-hidden">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-semibold text-white">What Our Fans Say</h3>
          <p className="text-gray-400 mt-2">Real stories from CineNiche subscribers</p>
        </div>
        <div id="testimonialCarousel" className="carousel slide mx-auto max-w-2xl" data-bs-ride="carousel">
          <div className="carousel-inner text-center px-4">
            <div className="carousel-item active">
              <blockquote className="text-xl italic text-gray-200">
                “CineNiche helped me rediscover my love for old Italian cinema. It’s brilliant!”
              </blockquote>
              <p className="mt-4 text-sm text-gray-400">— Ava, Film Student</p>
            </div>
            <div className="carousel-item">
              <blockquote className="text-xl italic text-gray-200">
                “Way better than Netflix if you’re into underground stuff. So worth it.”
              </blockquote>
              <p className="mt-4 text-sm text-gray-400">— Marcus, Indie Director</p>
            </div>
            <div className="carousel-item">
              <blockquote className="text-xl italic text-gray-200">
                “The recommendations actually *get* my taste. Mind-blowing!”
              </blockquote>
              <p className="mt-4 text-sm text-gray-400">— Lin, Writer</p>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    );
  };
  export default TestimonialsSection;