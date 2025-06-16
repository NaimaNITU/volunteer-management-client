import { VolunteerPost, VolunteerRequest, User } from '../types';

export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    photoURL: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    photoURL: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const dummyVolunteerPosts: VolunteerPost[] = [
  {
    id: '1',
    thumbnail: 'https://images.pexels.com/photos/6646915/pexels-photo-6646915.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Help Local Food Bank Distribution',
    description: 'Join us in distributing food packages to families in need. We organize weekly distributions and need volunteers to help sort, pack, and distribute food items.',
    category: 'Social Service',
    location: 'Community Center, Downtown',
    volunteersNeeded: 5,
    deadline: '2024-02-15',
    organizerName: 'John Doe',
    organizerEmail: 'john@example.com',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    thumbnail: 'https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Animal Shelter Care Assistant',
    description: 'Help care for rescued animals at our local shelter. Activities include feeding, cleaning, walking dogs, and providing companionship to animals waiting for adoption.',
    category: 'Animal Welfare',
    location: 'Happy Paws Animal Shelter',
    volunteersNeeded: 8,
    deadline: '2024-02-20',
    organizerName: 'Jane Smith',
    organizerEmail: 'jane@example.com',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    thumbnail: 'https://images.pexels.com/photos/5427673/pexels-photo-5427673.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Reading Tutor for Children',
    description: 'Volunteer as a reading tutor for elementary school children. Help improve literacy skills through one-on-one reading sessions and fun educational activities.',
    category: 'Education',
    location: 'Riverside Elementary School',
    volunteersNeeded: 12,
    deadline: '2024-02-25',
    organizerName: 'John Doe',
    organizerEmail: 'john@example.com',
    createdAt: '2024-01-12'
  },
  {
    id: '4',
    thumbnail: 'https://images.pexels.com/photos/5722164/pexels-photo-5722164.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Healthcare Support Volunteer',
    description: 'Assist healthcare workers by providing non-medical support to patients and families. Help with patient comfort, administrative tasks, and facility maintenance.',
    category: 'Healthcare',
    location: 'City General Hospital',
    volunteersNeeded: 6,
    deadline: '2024-02-18',
    organizerName: 'Jane Smith',
    organizerEmail: 'jane@example.com',
    createdAt: '2024-01-08'
  },
  {
    id: '5',
    thumbnail: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Community Garden Maintenance',
    description: 'Help maintain our community garden by planting, weeding, watering, and harvesting vegetables that are donated to local food pantries.',
    category: 'Social Service',
    location: 'Greenwood Community Garden',
    volunteersNeeded: 10,
    deadline: '2024-03-01',
    organizerName: 'John Doe',
    organizerEmail: 'john@example.com',
    createdAt: '2024-01-18'
  },
  {
    id: '6',
    thumbnail: 'https://images.pexels.com/photos/8471844/pexels-photo-8471844.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Senior Center Activities Coordinator',
    description: 'Organize and lead recreational activities for seniors including games, crafts, music sessions, and social events to promote community engagement.',
    category: 'Social Service',
    location: 'Golden Years Senior Center',
    volunteersNeeded: 4,
    deadline: '2024-02-12',
    organizerName: 'Jane Smith',
    organizerEmail: 'jane@example.com',
    createdAt: '2024-01-05'
  },
  {
    id: '7',
    thumbnail: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Environmental Cleanup Drive',
    description: 'Join our environmental cleanup initiative to remove litter from parks, beaches, and natural areas. Help preserve our environment for future generations.',
    category: 'Environmental',
    location: 'Sunset Beach Park',
    volunteersNeeded: 15,
    deadline: '2024-02-28',
    organizerName: 'John Doe',
    organizerEmail: 'john@example.com',
    createdAt: '2024-01-20'
  },
  {
    id: '8',
    thumbnail: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Technology Training for Seniors',
    description: 'Help seniors learn to use smartphones, tablets, and computers. Provide patient, one-on-one instruction to help bridge the digital divide.',
    category: 'Education',
    location: 'Public Library Main Branch',
    volunteersNeeded: 7,
    deadline: '2024-02-22',
    organizerName: 'Jane Smith',
    organizerEmail: 'jane@example.com',
    createdAt: '2024-01-14'
  }
];

export const dummyVolunteerRequests: VolunteerRequest[] = [
  {
    id: '1',
    postId: '2',
    postTitle: 'Animal Shelter Care Assistant',
    thumbnail: 'https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Help care for rescued animals at our local shelter.',
    category: 'Animal Welfare',
    location: 'Happy Paws Animal Shelter',
    deadline: '2024-02-20',
    organizerName: 'Jane Smith',
    organizerEmail: 'jane@example.com',
    volunteerName: 'John Doe',
    volunteerEmail: 'john@example.com',
    suggestion: 'I have experience with both cats and dogs, and would love to help with feeding and walking.',
    status: 'requested',
    createdAt: '2024-01-16'
  }
];