import React from 'react';
import { Link } from 'react-router-dom'; // For navigation between pages

const blogPosts = [
  {
    id: 1,
    title: "5 Tips for Choosing the Best Watches",
    excerpt: "In this blog post, we share some essential tips to help you choose the best watches based on your needs and style...",
    imageUrl: "https://via.placeholder.com/600x300",  // Replace with actual images
  },
  {
    id: 2,
    title: "Top 10 Trending Watches of 2025",
    excerpt: "Looking for the trendiest watches? We've rounded up the top 10 most popular watches of 2025. Find your perfect match!",
    imageUrl: "https://via.placeholder.com/600x300",  // Replace with actual images
  },
  {
    id: 3,
    title: "How to Maintain Your Watch for Longevity",
    excerpt: "A watch can last a lifetime if properly maintained. Read our guide to ensure your watch stays in perfect condition...",
    imageUrl: "https://via.placeholder.com/600x300",  // Replace with actual images
  }
];

const Blog = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-900">Welcome to Our Blog</h1>
        <p className="mt-4 text-lg text-gray-600">Stay up-to-date with the latest trends, tips, and news in the watch industry.</p>
      </div>

      {/* Blog Posts List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
              <p className="mt-2 text-gray-700">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="mt-4 text-blue-600 hover:text-blue-800">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;