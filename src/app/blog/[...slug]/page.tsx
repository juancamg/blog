import React from 'react';
import { Metadata } from 'next';
import { blogs as allBlogs } from '#site/content';
import { cn, formatDate } from '@/lib/utils';
import '@/styles/mdx.css';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { Mdx } from '@/components/mdx-component';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

async function getBlogFromParams(params: Promise<{ slug: string[] }>) {
  const resolvedParams = await params; 
  const slug = resolvedParams.slug.join('/');
  const blog = allBlogs.find((blog) => blog.slugAsParams === slug);

  if (!blog) {
    return null;
  }

  return blog;
}

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({
    slug: blog.slugAsParams.split('/'),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>; 
}): Promise<Metadata> {
  const blog = await getBlogFromParams(params);

  if (!blog) {
    return {};
  }

  return {
    title: blog.title,
    description: blog.description,
    authors: {
      name: blog.author,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const blog = await getBlogFromParams(params);

  if (!blog) {
    return <div>No se encontró el blog</div>;
  }

  return (
    <article className="container relative max-w-5xl py-6 lg:py-10">
      <div>
        {blog.date && (
          <time
            dateTime={blog.date}
            className="block text-sm text-muted-foreground"
          >
            Publicado el {formatDate(blog.date)}
          </time>
        )}

        <h1 className="mt-2 inline-block text-4xl font-bold capitalize leading-tight text-primary lg:text-5xl">
          {blog.title}
        </h1>

        {blog.author && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-4">
              <Image
                src={siteConfig.authorImage}
                alt={blog.author}
                width={42}
                height={42}
                className="rounded-full bg-white"
              />
              <div className="flex-1 text-left leading-tight">
                <p className="font-medium">{blog.author}</p>
                <p className="text-[12px] text-muted-foreground">
                  @{blog.author}
                </p>
              </div>
            </div>

            {blog.tag && (
              <div className="flex space-x-2">
                {blog.tag.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {blog.image && (
          <Image
            src={blog.image}
            alt={blog.title}
            width={720}
            height={405}
            priority
            className="my-8 border bg-muted transition-colors"
          />
        )}
        <Mdx code={blog.body} />
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: 'ghost' }))}
            legacyBehavior
          >
            <a className="flex items-center">
              <ChevronLeft className="mr-2 size-4" />
              Ver todas las entradas
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
}
