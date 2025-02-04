import React from 'react';
import { useParams } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "5 Tips for Choosing the Best Watches",
    content: "In this post, we'll discuss the top five tips for choosing the best watch. Whether you're looking for style, function, or longevity, these tips will help you make an informed decision. Tip 1: Always consider the brand. Tip 2: Decide between quartz or automatic movement...",
    imageUrl: "https://via.placeholder.com/1200x600",  // Replace with actual images
  },
  {
    id: 2,
    title: "Top 10 Trending Watches of 2025",
    content: "The watch industry is constantly evolving. In this post, we list the top 10 watches that are currently trending in 2025. These watches not only reflect the latest in design, but also incorporate cutting-edge technology. From digital to mechanical, these watches have it all...",
    imageUrl: "https://via.placeholder.com/1200x600",  // Replace with actual images
  },
  {
    id: 3,
    title: "How to Maintain Your Watch for Longevity",
    content: "Taking care of your watch is essential to ensure it lasts a lifetime. In this post, we share practical tips on how to maintain your watch's condition. Regular cleaning, avoiding extreme temperatures, and servicing your watch every few years will help keep it in top shape...",
    imageUrl: "https://via.placeholder.com/1200x600",  // Replace with actual images
  }
];

const BlogPost = () => {
  const { id } = useParams();  // Get the dynamic ID from URL

  // Find the selected blog post by ID
  const post = blogPosts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>Blog post not found!</div>;
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Blog Post Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-900">{post.title}</h1>
            <p className="mt-4 text-lg text-gray-700">{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;