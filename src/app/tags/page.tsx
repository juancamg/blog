"use client";

import React, { useState } from "react";
import { blogs as allBlogs } from "#site/content";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom } from "@fortawesome/free-solid-svg-icons";

export default function TagsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = Array.from(new Set(allBlogs.flatMap(blog => blog.tag || [])));

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredBlogs = selectedTags.length
    ? allBlogs.filter(blog => selectedTags.every(tag => blog.tag?.includes(tag)))
    : allBlogs;

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <h1 className="text-4xl font-bold mb-4">Etiquetas</h1>
      <p className="mb-4 text-lg text-gray-700">Selecciona las etiquetas para filtrar las publicaciones</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full ${selectedTags.includes(tag) ? 'bg-primary text-white bg-opacity-75' : 'bg-secondary text-secondary-foreground'}`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="mb-8 flex items-center">
        <hr className="flex-grow border-t border-gray-300 opacity-50" />
        <button
          onClick={() => setSelectedTags([])}
          className="mx-4 px-3 py-1 rounded-full text-white border flex items-center"
          style={{ backgroundColor: '#c084fc' }}
        >
          <FontAwesomeIcon icon={faBroom} className="mr-2" /> Limpiar
        </button>
        <hr className="flex-grow border-t border-gray-300 opacity-50" />
      </div>
      <div className="grid gap-10 sm:grid-cols-2">
        {filteredBlogs.map(blog => (
          <article key={blog.slug} className="group relative flex flex-col space-y-2">
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="border bg-muted transition-colors"
              />
            )}
            <h2 className="text-2xl font-extrabold text-primary">{blog.title}</h2>
            {blog.description && (
              <p className="text-muted-foreground">{blog.description}</p>
            )}
            <Link href={blog.slug} className="absolute inset-0">
              <span className="sr-only">Read more</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}