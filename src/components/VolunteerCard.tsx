import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Eye } from 'lucide-react';
import { VolunteerPost } from '../types';
import { format } from 'date-fns';

interface VolunteerCardProps {
  post: VolunteerPost;
  index?: number;
}

export default function VolunteerCard({ post, index = 0 }: VolunteerCardProps) {
  const isUrgent = new Date(post.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isUrgent && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Urgent
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            {post.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            {post.volunteersNeeded} volunteers needed
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            Deadline: {format(new Date(post.deadline), 'MMM dd, yyyy')}
          </div>
        </div>

        <Link
          to={`/volunteer-post/${post.id}`}
          className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors group"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Link>
      </div>
    </motion.div>
  );
}