import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { DocumentRenderer } from '@keystatic/core/renderer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = await reader.collections.journal.list();
  return slugs.map((slug) => ({ slug }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await reader.collections.journal.read(slug);

  if (!post) return notFound();

  const content = await post.content();

  return (
    <div className="bg-rm-beige min-h-screen text-rm-black selection:bg-rm-orange selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-6 md:p-12 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <Link href="/" className="pointer-events-auto flex items-center gap-2 hover:opacity-50 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-sm">Back</span>
        </Link>
        <span className="font-bold uppercase tracking-widest text-sm">Journal</span>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-20">
            <div className="flex items-center gap-4 mb-6">
                <span className="border border-rm-black/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest">
                    {post.tag}
                </span>
                <span className="text-xs font-mono opacity-60">
                    {post.publishedDate}
                </span>
            </div>
            <h1 className="text-[10vw] md:text-[5rem] leading-[0.9] font-bold tracking-tighter uppercase mb-8">
                {post.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-80 max-w-2xl">
                {post.summary}
            </p>
        </header>

        {/* Content */}
        <article className="prose prose-neutral max-w-none prose-p:leading-[1.8] prose-p:tracking-wide prose-p:mb-8 prose-headings:tracking-tight prose-li:leading-[1.8] prose-li:tracking-wide text-rm-black/90">
            <DocumentRenderer document={content} />
        </article>
      </main>
    </div>
  );
}
