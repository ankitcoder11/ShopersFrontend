import React from 'react';
import { Link } from 'react-router-dom'; // For navigation between pages

const blogPosts = [
  {
    id: 1,
    title: "A shooting day in Etretat",
    excerpt: "A romantic theater overlooking the English Channel, Étretat has inspired the most illustrious artists. A few moments on the spot are enough to understand why...",
    imageUrl: "https://prestige-theme-allure.myshopify.com/cdn/shop/articles/Featured_image_-_A_day_in_Etretat.jpg?v=1679486958&width=600",
  },
  {
    id: 2,
    title: "Caring for your Air Plant",
    excerpt: "Use these instructions to care for an Air Plant. This guide will tell you how to water an Air Plant; its light, temperature, humidity preferences and any additional care it might need to help it grow.",
    imageUrl: "https://bespoke-home-garden-theme.myshopify.com/cdn/shop/articles/caring-for-your-air-plant.webp?crop=region&crop_height=750&crop_left=401&crop_top=0&crop_width=999&v=1733514660&width=710",
  },
  {
    id: 3,
    title: "2018 Sniper: Outdoor Life review",
    excerpt: "",
    imageUrl: "https://cdn.shopify.com/s/files/1/0027/0994/6429/files/andhika-soreng-390599-unsplash_2048x2048.jpg?v=1526480493",
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