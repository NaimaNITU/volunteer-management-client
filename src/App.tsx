import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VolunteerPosts from './pages/VolunteerPosts';
import VolunteerPostDetails from './pages/VolunteerPostDetails';
import AddPost from './pages/AddPost';
import ManagePosts from './pages/ManagePosts';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/volunteer-posts" element={<VolunteerPosts />} />
              <Route 
                path="/volunteer-post/:id" 
                element={
                  <ProtectedRoute>
                    <VolunteerPostDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/add-post" 
                element={
                  <ProtectedRoute>
                    <AddPost />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/manage-posts" 
                element={
                  <ProtectedRoute>
                    <ManagePosts />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;