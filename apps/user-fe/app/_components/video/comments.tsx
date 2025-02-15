export function CommentSection({ previewMode }: { previewMode?: boolean }) {
  const comments = [
    {
      id: 1,
      username: "User Name",
      timeAgo: "2 days ago",
      content:
        "This is amazing! The talent in this episode was mind-blowing 🔥",
      likes: 245,
    },
    // ... other comments
  ];

  if (previewMode) {
    return (
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-neutral-800 flex-shrink-0" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{comments[0]?.username}</span>
            <span className="text-sm text-neutral-400">
              {comments[0]?.timeAgo}
            </span>
          </div>
          <p className="text-neutral-200">{comments[0]?.content}</p>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <span>{comments[0]?.likes} likes</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-medium">Comments</h3>
        <span className="text-neutral-400">1.2K</span>
      </div>

      {/* Add Comment */}
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-neutral-800 flex-shrink-0" />
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full bg-transparent border-b border-neutral-800 pb-2 focus:outline-none focus:border-neutral-600 transition-colors"
        />
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex-shrink-0" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.username}</span>
                <span className="text-sm text-neutral-400">
                  {comment.timeAgo}
                </span>
              </div>
              <p className="text-neutral-200">{comment.content}</p>
              <div className="flex items-center gap-4 text-sm text-neutral-400">
                <button className="hover:text-neutral-200">Like</button>
                <button className="hover:text-neutral-200">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
