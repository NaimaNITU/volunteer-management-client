import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Users, User, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { VolunteerPost } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface BeVolunteerModalProps {
  post: VolunteerPost;
  onClose: () => void;
}

interface VolunteerForm {
  suggestion: string;
}

export default function BeVolunteerModal({
  post,
  onClose,
}: BeVolunteerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerForm>();

  const onSubmit = async (data: VolunteerForm) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In real app, this would save to backend
      console.log("Volunteer request submitted:", {
        postId: post._id,
        volunteerName: user.name,
        volunteerEmail: user.email,
        suggestion: data.suggestion,
      });

      toast.success("Your volunteer request has been submitted successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to submit volunteer request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">
              Volunteer Request
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Post Information (Read-only) */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Volunteer Opportunity Details
              </h3>

              <div className="space-y-4">
                <div>
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Post Title
                    </label>
                    <div className="text-gray-900 font-medium">
                      {post.title}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <div className="text-gray-900">{post.category}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="flex items-center text-gray-900">
                      <MapPin className="h-4 w-4 mr-1" />
                      {post.location}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Volunteers Needed
                    </label>
                    <div className="flex items-center text-gray-900">
                      <Users className="h-4 w-4 mr-1" />
                      {post.volunteersNeeded}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deadline
                    </label>
                    <div className="flex items-center text-gray-900">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(post.deadline), "MMM dd, yyyy")}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organizer
                    </label>
                    <div className="flex items-center text-gray-900">
                      <User className="h-4 w-4 mr-1" />
                      {post.organizerName}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <div className="text-gray-900 text-sm leading-relaxed">
                    {post.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Volunteer Information */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Volunteer Name
                  </label>
                  <div className="text-gray-900 font-medium">{user?.name}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Volunteer Email
                  </label>
                  <div className="text-gray-900">{user?.email}</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="suggestion"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <FileText className="inline h-4 w-4 mr-1" />
                  Your Message / Suggestion
                </label>
                <textarea
                  {...register("suggestion", {
                    required: "Please provide a message or suggestion",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters long",
                    },
                  })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us why you want to volunteer for this opportunity and any relevant experience you have..."
                />
                {errors.suggestion && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.suggestion.message}
                  </p>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Status:</strong> Your request will be marked as
                  "Requested" and the organizer will review it.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
