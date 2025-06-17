import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, User, ArrowLeft, Heart } from "lucide-react";
import { VolunteerPost } from "../types"; // Assuming you have this type defined
import { format } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import BeVolunteerModal from "../components/BeVolunteerModal";

export default function VolunteerPostDetails() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<VolunteerPost | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch post details from the API
      const fetchPost = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/volunteers/${id}`
          );
          if (response.ok) {
            const data = await response.json();
            setPost(data);
            document.title = `${data.title} - VolunteerHub`;
          } else {
            console.error("Failed to fetch post:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Post Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The volunteer opportunity you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/volunteer-posts")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Posts
          </button>
        </div>
      </div>
    );
  }

  const isUrgent =
    new Date(post.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const isOwnPost = user?.email === post.organizerEmail;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Posts
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-64 sm:h-80">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              {isUrgent && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Urgent
                </span>
              )}
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {post.title}
              </h1>
              <p className="text-blue-200 text-lg">
                Organized by {post.organizerName}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Key Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">{post.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Volunteers Needed</p>
                  <p className="font-semibold text-gray-900">
                    {post.volunteersNeeded}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-semibold text-gray-900">
                    {format(new Date(post.deadline), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Opportunity
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {post.description}
              </p>
            </div>

            {/* Organizer Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Organizer Information
              </h3>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 p-2 rounded-full">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {post.organizerName}
                  </p>
                  <p className="text-gray-600">{post.organizerEmail}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {user && !isOwnPost && (
              <div className="text-center">
                {post.volunteersNeeded > 0 ? (
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Be a Volunteer
                  </button>
                ) : (
                  <div className="bg-gray-100 text-gray-600 px-8 py-4 rounded-lg text-lg font-medium">
                    No more volunteers needed
                  </div>
                )}
              </div>
            )}

            {isOwnPost && (
              <div className="text-center">
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg">
                  This is your own volunteer post. You cannot volunteer for your
                  own opportunity.
                </div>
              </div>
            )}

            {!user && (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Please log in to volunteer for this opportunity
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Login to Volunteer
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Be Volunteer Modal */}
      {showModal && (
        <BeVolunteerModal post={post} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
