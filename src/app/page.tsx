import React from 'react';
import { Metadata } from 'next';
import PageHeader from '@/components/page-header';
import { blogs as allBlogs } from '#site/content';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Xhetic Shadows',
};

export default function Home() {
  const blogs = allBlogs.filter((blog) => blog.published);
  const latestBlogs = blogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
  const featuredBlogs = blogs.filter((blog) => blog.featured).slice(0, 4);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <PageHeader
        title="Xhetic Shadows"
        description="Explorando los secretos ocultos de la ciberseguridad: writeups, retos y más"
      />
      <hr className="my-8" />
      <h2 className="mb-4 text-3xl font-bold">Últimos Posts</h2>
      {latestBlogs.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {latestBlogs.map((blog) => (
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
                  className="border bg-muted transition-transform group-hover:scale-105" 
                />
              )}
              <h2 className="text-2xl font-extrabold text-primary">
                {blog.title}
              </h2>
              <Link href={blog.slug} className="absolute inset-0">
                <span className="sr-only">Ver mas</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No se han encontrado entradas</p>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/blog"
          className="rounded-md bg-[#c084fc] px-4 py-2 text-white transition-transform hover:scale-105 active:scale-95" 
        >
          Ver todas las publicaciones
        </Link>
      </div>

      <hr className="my-8" />

      <h2 className="mb-4 mt-10 text-3xl font-bold">Posts Destacados</h2>
      {featuredBlogs.length ? (
        <div className="mb-10 grid gap-10 sm:grid-cols-2">
          {featuredBlogs.map((blog) => (
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
                  className="border bg-muted transition-transform group-hover:scale-105" 
                />
              )}
              <h2 className="text-2xl font-extrabold text-primary">
                {blog.title}
              </h2>
              {blog.description && (
                <p className="text-sm text-muted-foreground">
                  {blog.description}
                </p>
              )}
              <Link href={blog.slug} className="absolute inset-0">
                <span className="sr-only">Ver mas</span>
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