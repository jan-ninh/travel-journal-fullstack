// src\pages\EditPost.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { getSinglePost, updatePost } from "@/data";
import { useAuth } from "@/contexts";

type FormData = Omit<Post, "_id">;

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormData>({
    title: "",
    author: "",
    image: "",
    content: "",
    userId: "",
  });

  useEffect(() => {
    (async () => {
      if (!id) return;

      try {
        const post = await getSinglePost(id);

        // Ownership check (Frontend)
        if (!user || post.userId !== user._id) {
          toast.error("Not authorized");
          navigate("/", { replace: true });
          return;
        }

        setForm({
          title: post.title,
          author: post.author,
          image: post.image,
          content: post.content,
          userId: post.userId,
        });
      } catch (error: unknown) {
        const message = (error as { message: string }).message;
        toast.error(message);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    const ok = window.confirm("Save changes?");
    if (!ok) return;

    try {
      const updated = await updatePost(id, form);
      toast.success("Post updated");
      navigate(`/post/${updated._id}`, { replace: true });
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      toast.error(message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <form
      className="md:w-1/2 mx-auto flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-2 justify-between">
        <label className="form-control grow">
          <div className="label-text">Title</div>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control grow">
          <div className="label-text">Author</div>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>
      </div>

      <label className="form-control w-full">
        <div className="label-text">Image URL</div>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </label>

      <label className="form-control">
        <div className="label-text">Content</div>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="textarea textarea-bordered h-24"
        />
      </label>

      <button type="submit" className="btn btn-primary self-center">
        Save
      </button>
    </form>
  );
};

export default EditPost;
