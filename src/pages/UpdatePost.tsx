import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  FileText,
  Tag,
  Mail,
  Building,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const UpdatePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    location: "",
    date: "",
    volunteersNeeded: "",
    category: "community",
    organizerName: "",
    organizerEmail: "",
    requirements: "",
    benefits: "",
    imageUrl: "",
  });

  const categories = [
    { value: "community", label: "Community Service" },
    { value: "education", label: "Education" },
    { value: "environment", label: "Environment" },
    { value: "healthcare", label: "Healthcare" },
    { value: "animals", label: "Animal Welfare" },
    { value: "seniors", label: "Senior Care" },
    { value: "youth", label: "Youth Programs" },
    { value: "disaster", label: "Disaster Relief" },
  ];

  useEffect(() => {
    // Mock data loading for demonstration
    const mockData = {
      title: "Beach Cleanup Drive",
      description:
        "Join us for a community beach cleanup to protect marine life and keep our shores beautiful.",
      fullDescription:
        "Our monthly beach cleanup is a vital community effort to protect marine ecosystems and maintain the natural beauty of our coastline. Volunteers will work together to remove litter, plastic debris, and other pollutants from the beach and surrounding areas.",
      location: "Santa Monica Beach, CA",
      date: "2024-02-15",
      volunteersNeeded: "50",
      category: "environment",
      organizerName: "Ocean Conservation Society",
      organizerEmail: "contact@oceanconservation.org",
      requirements:
        "Must be 16 years or older\nWear comfortable clothes that can get dirty\nBring water bottle and sun protection\nClosed-toe shoes required",
      benefits:
        "Community service hours certificate\nFree t-shirt and refreshments\nLearn about marine conservation\nMeet like-minded community members",
      imageUrl:
        "https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=1200",
    };

    setTimeout(() => {
      setFormData(mockData);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Validate required fields
      if (
        !formData.title ||
        !formData.description ||
        !formData.location ||
        !formData.date ||
        !formData.volunteersNeeded
      ) {
        toast.error("Please fill in all required fields");
        setSaving(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Volunteer opportunity updated successfully!");
      navigate("/manage-my-posts");
    } catch (error) {
      toast.error("Failed to update volunteer opportunity. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/manage-my-posts")}
            className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to My Posts
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Update Volunteer Opportunity
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Make changes to your volunteer opportunity
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <FileText className="inline h-4 w-4 mr-2" />
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter a compelling title for your volunteer opportunity"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <Tag className="inline h-4 w-4 mr-2" />
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="volunteersNeeded"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <Users className="inline h-4 w-4 mr-2" />
                  Volunteers Needed *
                </label>
                <input
                  type="number"
                  id="volunteersNeeded"
                  name="volunteersNeeded"
                  value={formData.volunteersNeeded}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Number of volunteers needed"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <MapPin className="inline h-4 w-4 mr-2" />
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Event location"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Short Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Brief description that will appear in the opportunity listing"
              />
            </div>

            <div>
              <label
                htmlFor="fullDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Full Description
              </label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Detailed description of the volunteer opportunity"
              />
            </div>

            {/* Organizer Information */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Organizer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="organizerName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    <Building className="inline h-4 w-4 mr-2" />
                    Organization/Name
                  </label>
                  <input
                    type="text"
                    id="organizerName"
                    name="organizerName"
                    value={formData.organizerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Your organization or name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organizerEmail"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    <Mail className="inline h-4 w-4 mr-2" />
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="organizerEmail"
                    name="organizerEmail"
                    value={formData.organizerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Contact email for volunteers"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="requirements"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="List requirements (one per line)"
                />
              </div>

              <div>
                <label
                  htmlFor="benefits"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Benefits/What Volunteers Get
                </label>
                <textarea
                  id="benefits"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="List benefits (one per line)"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Image URL (Optional)
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/manage-my-posts")}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
