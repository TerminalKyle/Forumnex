import React, { useState } from "react";
import { ChevronDown, Sparkles, Image as ImageIcon, Send } from "lucide-react";

export default function MainContent({ className }: { className?: string }) {
  const [postContent, setPostContent] = useState("");

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      console.log("New post:", postContent);
      // In a real application, you would send this to a backend
      setPostContent(""); // Clear the input after submission
    }
  };

  const posts = [
    {
      id: 1,
      title: "What's everyone working on this week?",
      content: "Tell r/python what you're working on this week! You can be bragging, grousing, sharing your passion, or explaining your pain. Talk about your current project or your pet project; whatever you want to share.",
      author: {
        name: "swallowedlava",
        avatar: "https://picsum.photos/seed/swallowedlava/40/40",
      },
      timeAgo: "3 hours ago",
      likes: 301,
      comments: 80,
    },
    {
      id: 2,
      title: "I wrote a program on python to show how the number of swearwords differs across each breaking bad episode to see if there was any kind of correlation - turns out there isn't and this was a complete flop",
      content: "",
      author: {
        name: "Jackpick15",
        avatar: "https://picsum.photos/seed/jackpick15/40/40",
      },
      timeAgo: "2 hours ago",
      likes: 593,
      comments: 255,
    },
    {
      id: 3,
      title: "Boids - organic motion from 3 simple rules",
      content: "This is one of the rendering of my recent project: Boids. Source code can be found here. Inspired by Code Parade's video. It's called a flocking algorithm. People have been making them for decades now. For example, the one shown in this post is from 1986 and is the \"hello world\" of flocking algorithms. It's a pretty famous algorithm for its stunning elegance.",
      author: {
        name: "chrismit3s",
        avatar: "https://picsum.photos/seed/chrismit3s/40/40",
      },
      timeAgo: "3 hours ago",
      likes: 1887,
      comments: 1099,
    },
  ];

  return (
    <div className={`flex-1 p-8 overflow-y-auto bg-background ${className}`}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Top posts</h2>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
        <h1 className="text-5xl font-extrabold text-foreground mb-8">Python</h1>

        <div className="bg-muted rounded-lg p-4 flex items-center space-x-4 mb-8">
          <input
            type="text"
            placeholder="Post something to Python"
            className="flex-1 bg-background rounded-md px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <Sparkles className="w-5 h-5 text-muted-foreground cursor-pointer" />
          <ImageIcon className="w-5 h-5 text-muted-foreground cursor-pointer" />
          <button 
            className="bg-primary text-primary-foreground py-2 px-4 rounded-md font-semibold hover:bg-primary/90 transition-colors flex items-center space-x-2"
            onClick={handlePostSubmit}
          >
            <Send className="w-4 h-4" />
            <span>Submit post</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-muted rounded-lg p-6 shadow-md flex">
            <div className="flex-shrink-0 mr-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
              {post.content && (
                <p className="text-muted-foreground text-sm mb-4">{post.content}</p>
              )}
              <div className="flex items-center text-muted-foreground text-xs">
                <span className="mr-2">@{post.author.name}</span>
                <span className="mr-2">•</span>
                <span>{post.timeAgo}</span>
                <span className="flex-1"></span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="mr-1">♥</span>
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">💬</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
