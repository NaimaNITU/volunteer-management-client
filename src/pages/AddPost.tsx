import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import {
  Plus,
  Image,
  FileText,
  MapPin,
  Users,
  Calendar,
  Tag,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

interface PostForm {
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  location: string;
  volunteersNeeded: number;
  deadline: Date;
}

const categories = [
  "Healthcare",
  "Education",
  "Social Service",
  "Animal Welfare",
  "Environmental",
  "Community Development",
  "Disaster Relief",
  "Arts & Culture",
  "Sports & Recreation",
  "Technology",
];

export default function AddPost() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Volunteer Post - VolunteerHub";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>();

  const onSubmit = async (data: PostForm) => {
    if (!user || !selectedDate) return;

    setIsSubmitting(true);
    try {
      // Prepare the new post data
      const newPost = {
        thumbnail: data.thumbnail,
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        volunteersNeeded: data.volunteersNeeded,
        deadline: selectedDate.toISOString().split("T")[0],
        organizerName: user.name,
        organizerEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      // Make POST request to backend API
      const response = await fetch("http://localhost:5000/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create volunteer post");
      }

      const result = await response.json();
      console.log("New post created:", result);

      toast.success("Volunteer post created successfully!");
      navigate("/manage-posts");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to create a post
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-4"
            >
              <Plus className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create Volunteer Opportunity
            </h1>
            <p className="text-gray-600 mt-2">
              Share your volunteer opportunity with the community
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Thumbnail */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Image className="h-4 w-4 mr-2" />
                Thumbnail Image URL
              </label>
              <input
                {...register("thumbnail", {
                  required: "Thumbnail URL is required",
                  pattern: {
                    value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                    message: "Please enter a valid image URL",
                  },
                })}
                type="url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {errors.thumbnail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="h-4 w-4 mr-2" />
                Post Title
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters long",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must not exceed 100 characters",
                  },
                })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter a descriptive title for your volunteer opportunity"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="h-4 w-4 mr-2" />
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 50,
                    message: "Description must be at least 50 characters long",
                  },
                })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the volunteer opportunity, what volunteers will do, requirements, and any other relevant information..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Tag className="h-4 w-4 mr-2" />
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Please select a category",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Volunteers Needed */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  Number of Volunteers Needed
                </label>
                <input
                  {...register("volunteersNeeded", {
                    required: "Number of volunteers is required",
                    min: {
                      value: 1,
                      message: "At least 1 volunteer is required",
                    },
                    max: {
                      value: 100,
                      message: "Maximum 100 volunteers allowed",
                    },
                  })}
                  type="number"
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of volunteers needed"
                />
                {errors.volunteersNeeded && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.volunteersNeeded.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </label>
              <input
                {...register("location", {
                  required: "Location is required",
                  minLength: {
                    value: 5,
                    message: "Location must be at least 5 characters long",
                  },
                })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the location where volunteer work will take place"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                Deadline
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholderText="Select deadline date"
                required
              />
              {!selectedDate && (
                <p className="mt-1 text-sm text-red-600">
                  Deadline is required
                </p>
              )}
            </div>

            {/* Organizer Info (Read-only) */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Organizer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organizer Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organizer Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !selectedDate}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Creating Post..." : "Create Post"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
