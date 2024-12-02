"use client";

import React, { useState } from "react";
import PageHeader from "@/components/page-header";
import { blogs as allBlogs } from "#site/content";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = [
  "Todas las categorías",
  "Writeups",
  "Retos",
  "OSINT",
  "Análisis Forense",
  "Criptografía",
  "Noticias & Tendencias",
  "Herramientas",
  "General",
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorías");

  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearchTerm = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas las categorías" || blog.category === selectedCategory;
    const isPublished = blog.published === true;
    return matchesSearchTerm && matchesCategory && isPublished;
  });

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <PageHeader title="Todas las Publicaciones" />
      <hr className="my-8" />

      <div className="flex flex-col sm:flex-row justify-between mb-8">
        <div className="relative flex items-center w-full sm:w-auto mb-4 sm:mb-0">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded-md bg-[#e9ddfc] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c084fc]"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-3 pr-10 py-2 w-full sm:w-60 border border-gray-300 rounded-md bg-[#e9ddfc] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c084fc]"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Link href="/tags" className="px-4 py-2 bg-[#c084fc] text-white rounded-md transition-transform transform hover:scale-105 active:scale-95">
            Etiquetas
          </Link>
        </div>
      </div>

      {filteredBlogs.length ? (
        <div className="grid gap-10 sm:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="group relative flex flex-col space-y-2"
            >
              {blog.image && (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={804}
                  height={452}
                  className="border bg-muted transition-colors"
                />
              )}
              <h2 className="text-xl font-bold text-primary">
                {blog.title}
              </h2>
              {blog.description && (
                <p className="text-sm text-muted-foreground">{blog.description}</p>
              )}
              {blog.date && (
                <p className="text-sm text-muted-foreground">
                  {new Date(blog.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
              <Link href={blog.slug} className="absolute inset-0">
                <span className="sr-only">Ver más</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No se han encontrado entradas</p>
      )}
    </div>
  );
}