// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deletePost, getPosts } from "@/data";
import { PostCard, PostsSkeleton } from "@/components";
import { useAuth } from "@/contexts";

const Home = () => {
  const [postsLoading, setPostsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const { user, loading: authLoading } = useAuth();

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
      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Post deleted");
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      toast.error(message);
    }
  };

  if (postsLoading) return <PostsSkeleton />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
  );
};

export default Home;
