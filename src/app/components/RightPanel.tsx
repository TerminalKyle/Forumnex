import React from "react";
import { Globe, Lightbulb, BarChart } from "lucide-react";

export default function RightPanel() {
  const handleTagClick = (tag: string) => {
    console.log(`Tag clicked: ${tag}`);
  };

  const handleLearningTopicClick = (topicTitle: string) => {
    console.log(`Learning topic clicked: ${topicTitle}`);
  };

  const learningTopics = [
    {
      title: "Get started with machine learning",
      hours: 8,
      karma: "12k",
      icon: Globe,
    },
    {
      title: "Create a backend app with Javascript",
      hours: 22,
      karma: "55k",
      icon: Lightbulb,
    },
    {
      title: "Visualise data with Python",
      hours: 49,
      karma: "108k",
      icon: BarChart,
    },
  ];

  return (
    <div className="w-80 bg-card-background text-foreground p-6 overflow-y-auto">
      <div className="bg-muted rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">About the Python community</h2>
        <p className="text-sm text-muted-foreground mb-4">
          News about the dynamic, interpreted, interactive, object-oriented, extensible programming language Python.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {[ "i made this", "resource", "help", "discussion", "machine learning", "news", "web development", ].map((tag, index) => (
            <span 
              key={index} 
              className="bg-background text-xs text-muted-foreground px-3 py-1 rounded-full cursor-pointer hover:bg-muted transition-colors"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 text-center text-foreground">
          <div>
            <p className="text-lg font-bold">556k</p>
            <p className="text-xs text-muted-foreground">MEMBERS</p>
          </div>
          <div>
            <p className="text-lg font-bold">2.7k</p>
            <p className="text-xs text-muted-foreground">ONLINE</p>
          </div>
          <div>
            <p className="text-lg font-bold">1.9m</p>
            <p className="text-xs text-muted-foreground">POSTS</p>
          </div>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Want to learn Python?</h2>
        <div className="space-y-4">
          {learningTopics.map((topic, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 cursor-pointer hover:bg-background rounded-lg p-2 -m-2 transition-colors"
              onClick={() => handleLearningTopicClick(topic.title)}
            >
              <div className="bg-background rounded-full p-2">
                <topic.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">{topic.title}</h3>
                <p className="text-xs text-muted-foreground">{topic.hours} hours • {topic.karma}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
