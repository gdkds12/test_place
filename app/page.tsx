import StickyCardStack from "./components/StickyCardStack";
import { reader } from "@/lib/keystatic";

export default async function Home() {
  // Fetch latest 3 journal posts
  const posts = await reader.collections.journal.all();
  const latestPosts = posts.slice(0, 3).map(post => ({
    title: post.entry.title,
    date: post.entry.publishedDate,
    tag: post.entry.tag,
    slug: post.slug
  }));

  return (
    <main className="w-full bg-black">
      <StickyCardStack initialPosts={latestPosts} />
    </main>
  );
}