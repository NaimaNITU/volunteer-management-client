import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, Users, Calendar, MapPin } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { VolunteerPost, VolunteerRequest } from "../types";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function ManagePosts() {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<VolunteerPost[]>([]);
  const [myRequests, setMyRequests] = useState<VolunteerRequest[]>([]);

  console.log(user, "User");

  useEffect(() => {
    document.title = "Manage My Posts - VolunteerHub";

    if (user) {
      // Fetch posts by current user
      const fetchPosts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/volunteers/email?organizerEmail=${user.email}`
          );
          const data = await response.json();
          setMyPosts(data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      // Fetch volunteer requests by current user
      const fetchRequests = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/requests?volunteerEmail=${user.email}`
          );
          const data = await response.json();
          setMyRequests(data);
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
      };

      fetchPosts();
      fetchRequests();
    }
  }, [user]);

  console.log(myRequests, "myRequests");

  const handleDeletePost = async (postId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:5000/volunteers/${postId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setMyPosts((prev) => prev.filter((post) => post._id !== postId));
          toast.success("Post deleted successfully");
        } else {
          toast.error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Error deleting post");
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to manage your posts
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Manage My Posts
          </h1>
          <p className="text-xl text-gray-600">
            Manage your volunteer opportunities and requests
          </p>
        </motion.div>

        {/* My Volunteer Need Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            My Volunteer Need Posts
          </h2>

          {myPosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No volunteer posts yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't created any volunteer opportunities yet. Start by
                creating your first post.
              </p>
              <a
                href="/add-post"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Create Your First Post
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Post Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Volunteers Needed
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deadline
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {myPosts.map((post, index) => (
                      <motion.tr
                        key={post._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-16 h-16 rounded-lg object-cover mr-4"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                {post.title}
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {post.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <Users className="h-4 w-4 mr-1" />
                            {post.volunteersNeeded}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {format(new Date(post.deadline), "MMM dd, yyyy")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <a
                              href={`/volunteer-post/${post._id}`}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </a>

                            <Link
                              to={`/update-post/${post._id}`}
                              className="text-green-600 hover:text-green-900 p-1"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                            </Link>

                            {/* <button
                              onClick={() =>
                                toast(
                                  "Update functionality will be implemented with backend!"
                                )
                              }
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Edit Post"
                            >
                              <Edit className="h-4 w-4" />
                            </button> */}
                            <button
                              onClick={() => handleDeletePost(post._id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete Post"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.section>

        {/* My Volunteer Requests */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            My Volunteer Requests
          </h2>

          {myRequests.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">🙋‍♂️</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No volunteer requests yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't applied to volunteer for any opportunities yet.
                Browse available posts to get started.
              </p>
              <a
                href="/volunteer-posts"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Browse Opportunities
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myRequests.map((request, index) => (
                  <motion.div
                    key={request.postId + index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white shadow-md rounded-xl p-6 border"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Request for Post ID: {request.postId}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Name:</span>{" "}
                      {request.volunteerName}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Email:</span>{" "}
                      {request.volunteerEmail}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Suggestion:</span>{" "}
                      {request.suggestion.length > 80
                        ? request.suggestion.slice(0, 80) + "..."
                        : request.suggestion}
                    </p>
                    <p className="text-sm font-semibold text-yellow-600 mt-3">
                      Status: {request.status}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
