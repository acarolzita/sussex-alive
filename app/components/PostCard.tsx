// components/PostCard.tsx
export default function PostCard({ post }) {
    return (
      <div style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
          By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    );
  }
  