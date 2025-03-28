"use client";

import { cn } from '@/lib/utils';
import React, { HTMLAttributes, useState, useEffect } from 'react';
import * as runtime from 'react/jsx-runtime';
import Image from 'next/image';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

type ComponentsProps = HTMLAttributes<HTMLElement>;

const Img = ({ className, alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (src) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
    }
  }, [src]);

  const scaledWidth = dimensions.width * 1.5;
  const scaledHeight = dimensions.height * 1.5;

  return (
    <>
      <img
        className={cn('cursor-pointer rounded-md border', className)}
        alt={alt}
        src={src}
        onClick={() => setIsOpen(true)}
        {...props}
      />
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setIsOpen(false)}
          >
            <img
              src={src}
              alt={alt}
              className="rounded-lg border"
              style={{
                width: `${scaledWidth}px`, 
                height: `${scaledHeight}px`,
                maxWidth: '90vw', 
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
            />
            <button
              className="fixed top-4 right-4 p-1 text-white bg-gray-800 rounded-full hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

const components = {
  h1: ({ className, ...props }: ComponentsProps) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-primary',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentsProps) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight text-primary first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentsProps) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-primary',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentsProps) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-primary',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: ComponentsProps) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-primary',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: ComponentsProps) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight text-primary',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: ComponentsProps) => (
    <a
      className={cn('font-medium text-primary underline underline-offset-4', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentsProps) => (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentsProps) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentsProps) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentsProps) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentsProps) => (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground', className)}
      {...props}
    />
  ),
  img: Img, // Usamos el componente Img
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('m-0 border-t p-0 even:bg-secondary', className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentsProps) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentsProps) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentsProps) => (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border py-4 text-sm dark:!bg-secondary',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentsProps) => (
    <code
      className={cn(
        'relative rounded border px-[0.3rem] py-[0.2rem] font-code !text-sm font-light dark:!bg-secondary',
        className
      )}
      {...props}
    />
  ),
  Image,
};

interface MdxProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export function MDXContent({ code, components }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ Image, ...components }} />;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div>
      <Component components={components} />
    </div>
  );
}