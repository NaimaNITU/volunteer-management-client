export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
}

export interface VolunteerPost {
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  location: string;
  volunteersNeeded: number;
  deadline: string;
  organizerName: string;
  organizerEmail: string;
  createdAt: string;
}

export interface VolunteerRequest {
  _id: string;
  postId: string;
  volunteerName: string;
  volunteerEmail: string;
  suggestion: string;
  status: "pending" | "approved" | "rejected"; // Add more statuses if needed
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    photoURL: string,
    password: string
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}
