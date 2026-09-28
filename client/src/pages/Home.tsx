import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deletePost, getPosts } from "@/data";
import { PostCard, PostsSkeleton } from "@/components";

const Home = () => {
  const [postsLoading, setPostsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedPosts: Post[] = await getPosts();
        setPosts(fetchedPosts);
      } catch (error: unknown) {
        const message = (error as { message: string }).message;
        toast.error(message);
      } finally {
        setPostsLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post._id !== id));
      toast.success("Post deleted");
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      toast.error(message);
    }
  };

  if (postsLoading) return <PostsSkeleton />;

  return (
    <section className="home-page">
      <div className="home-hero">
        <div className="home-hero-copy">
          <span className="eyebrow">YOUR TRAVEL JOURNAL</span>
          <h1 className="home-title">
            Keep the moments.
            <span>Tell the story.</span>
          </h1>
          <p className="home-intro">
            A personal collection of places, memories and snapshots from the
            road.
          </p>
        </div>

        <div className="hero-accent" aria-hidden="true">
          <span className="hero-accent-line" />
          <span className="hero-accent-dot" />
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">LATEST ENTRIES</span>
          <h2>Recent journeys</h2>
        </div>
        <span className="entry-count">
          {posts.length} {posts.length === 1 ? "story" : "stories"}
        </span>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            _id={post._id}
            content={post.content}
            image={post.image}
            title={post.title}
            userId={post.userId}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
