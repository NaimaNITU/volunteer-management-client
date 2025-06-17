import React, { useEffect, useState } from "react";
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
import { API_BASE } from "../api/baseUrl";

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

const UpdatePost = () => {
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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE}/volunteers/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();

        setFormData({
          title: data.title || "",
          description: data.description || "",
          fullDescription: data.fullDescription || "",
          location: data.location || "",
          date: data.deadline || "",
          volunteersNeeded: data.volunteersNeeded || "",
          category: data.category?.toLowerCase() || "community",
          organizerName: data.organizerName || "",
          organizerEmail: data.organizerEmail || "",
          requirements: data.requirements || "",
          benefits: data.benefits || "",
          imageUrl: data.thumbnail || "",
        });

        document.title = `${data.title} - VolunteerHub`;
      } catch (error) {
        toast.error("Error fetching post details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      fullDescription: formData.fullDescription,
      location: formData.location,
      deadline: formData.date,
      volunteersNeeded: formData.volunteersNeeded,
      category: formData.category,
      organizerName: formData.organizerName,
      organizerEmail: formData.organizerEmail,
      requirements: formData.requirements,
      benefits: formData.benefits,
      thumbnail: formData.imageUrl,
    };

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/volunteers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update post");

      toast.success("Post updated successfully!");
      navigate("/manage-posts");
    } catch (error) {
      toast.error("Failed to update. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={() => navigate("/manage-posts")}
            className="flex items-center text-blue-600 hover:underline mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to My Posts
          </button>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Edit Volunteer Opportunity
          </h1>
          <p className="text-gray-500 mb-6">
            Update the details below to improve your event post.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <FileText className="inline h-4 w-4 mr-1" /> Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <Tag className="inline h-4 w-4 mr-1" /> Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <Users className="inline h-4 w-4 mr-1" /> Volunteers *
                </label>
                <input
                  type="number"
                  name="volunteersNeeded"
                  value={formData.volunteersNeeded}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <MapPin className="inline h-4 w-4 mr-1" /> Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <Calendar className="inline h-4 w-4 mr-1" /> Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Short Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* <div>
              <label className="block mb-1 font-medium text-gray-700">
                Full Description
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                rows={5}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div> */}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <Building className="inline h-4 w-4 mr-1" /> Organizer Name
                </label>
                <input
                  type="text"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <Mail className="inline h-4 w-4 mr-1" /> Organizer Email
                </label>
                <input
                  type="email"
                  name="organizerEmail"
                  value={formData.organizerEmail}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Benefits
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div> */}

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-between gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/manage-posts")}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
