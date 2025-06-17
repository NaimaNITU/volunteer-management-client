import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Users,
  Heart,
  Award,
  MapPin,
  Target,
  Globe,
} from "lucide-react";
import { VolunteerPost } from "../types"; // Assuming you have this type defined
import VolunteerCard from "../components/VolunteerCard"; // Assuming you have this component

const heroSlides = [
  {
    id: 1,
    title: "Make a Difference in Your Community",
    subtitle: "Join thousands of volunteers creating positive change",
    description:
      "Connect with meaningful volunteer opportunities that match your skills and passion. Every contribution matters.",
    image:
      "https://images.pexels.com/photos/6646915/pexels-photo-6646915.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Start Volunteering",
  },
  {
    id: 2,
    title: "Help Those Who Need It Most",
    subtitle: "Your time can change lives",
    description:
      "From helping at food banks to supporting education, find volunteer opportunities that align with your values.",
    image:
      "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Explore Opportunities",
  },
  {
    id: 3,
    title: "Build Stronger Communities Together",
    subtitle: "Unity through service",
    description:
      "Join a network of compassionate individuals working together to address community challenges and create lasting impact.",
    image:
      "https://images.pexels.com/photos/8471844/pexels-photo-8471844.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Join Our Community",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [upcomingPosts, setUpcomingPosts] = useState<VolunteerPost[]>([]);

  useEffect(() => {
    // Set page title
    document.title = "Home - VolunteerHub";

    // Fetch the volunteer posts from the backend API
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/volunteers");
        const data = await response.json();

        // Sort posts by deadline and get the first 6 posts
        const sortedPosts = data
          .sort(
            (a: VolunteerPost, b: VolunteerPost) =>
              new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          )
          .slice(0, 6);
        setUpcomingPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Users, label: "Active Volunteers", value: "1,247" },
    { icon: Heart, label: "Lives Impacted", value: "8,934" },
    { icon: Award, label: "Success Stories", value: "156" },
    { icon: MapPin, label: "Communities", value: "23" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            initial={{ scale: 1.1 }}
            animate={{ scale: index === currentSlide ? 1 : 1.1 }}
            transition={{ duration: 7 }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0,
                    y: index === currentSlide ? 0 : 30,
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-6xl font-bold mb-4"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0,
                    y: index === currentSlide ? 0 : 30,
                  }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl mb-2 text-blue-200"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0,
                    y: index === currentSlide ? 0 : 30,
                  }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg mb-8 max-w-2xl mx-auto"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0,
                    y: index === currentSlide ? 0 : 30,
                  }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Link
                    to="/volunteer-posts"
                    className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Needs Now Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Volunteer Needs Now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Urgent volunteer opportunities with upcoming deadlines. Your
              immediate help can make a critical difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {upcomingPosts.map((post, index) => (
              <VolunteerCard key={post._id} post={post} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/volunteer-posts"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              See All Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "10,000+", label: "Active Volunteers" },
              { icon: Target, number: "500+", label: "Projects Completed" },
              { icon: Award, number: "50+", label: "Awards Received" },
              { icon: Globe, number: "25+", label: "Countries Served" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heart
              className="h-16 w-16 text-white mx-auto mb-8"
              fill="currentColor"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-8">
              Join our community of passionate volunteers and help create
              positive change in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </Link>
              <Link
                to="/volunteer-posts"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300"
              >
                Browse Opportunities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
