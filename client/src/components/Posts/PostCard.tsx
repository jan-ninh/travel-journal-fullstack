// src\components\Posts\PostCard.tsx
import { Link } from "react-router";
import { useAuth } from "@/contexts";

type PostCardProps = {
  _id: string;
  content: string;
  image: string;
  title: string;
  userId: string;
  onDelete?: (id: string) => Promise<void> | void;
};

const PostCard = ({
  _id,
  content,
  image,
  title,
  userId,
  onDelete,
}: PostCardProps) => {
  const { user } = useAuth();
  const isOwner = !!user && userId === user._id;

  const handleDelete = async () => {
    if (!onDelete) return;
    const ok = window.confirm("Delete this post?");
    if (!ok) return;
    await onDelete(_id);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="bg-white h-48">
        <img src={image} alt={title} className="object-cover h-full w-full" />
      </figure>

      <div className="card-body h-56">
        <h2 className="card-title">{title}</h2>
        <p className="truncate text-wrap">{content}</p>

        <div className="mt-4 flex gap-2">
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Read More
          </Link>

          {isOwner && (
            <>
              <Link to={`/edit/${_id}`} className="btn">
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
