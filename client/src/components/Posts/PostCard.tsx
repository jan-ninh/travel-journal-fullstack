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
    <article className="journal-card">
      <Link to={`/post/${_id}`} className="journal-card-image-link">
        <figure className="journal-card-image-wrap">
          <img
            src={image}
            alt={title}
            className="journal-card-image"
            loading="lazy"
          />
          <div className="journal-card-image-overlay" aria-hidden="true" />
          <span className="journal-card-tag">Journal entry</span>
        </figure>
      </Link>

      <div className="journal-card-body">
        <div>
          <h2 className="journal-card-title">{title}</h2>
          <p className="journal-card-content">{content}</p>
        </div>

        <div className="journal-card-actions">
          <Link to={`/post/${_id}`} className="primary-action">
            Explore story
            <span aria-hidden="true">→</span>
          </Link>

          {isOwner && (
            <div className="owner-actions">
              <Link to={`/edit/${_id}`} className="secondary-action">
                Edit
              </Link>
              <button
                type="button"
                className="secondary-action danger-action"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
