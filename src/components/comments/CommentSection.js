import React, { useState } from 'react';
import { Button } from '../../components/ui/button'; // Fix import path
import { Textarea } from '../../components/ui/textarea'; // Fix import path
import { CommentItem } from './CommentItem';

export const CommentSection = ({ locationId, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(locationId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Comments</h4>
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <CommentItem key={index} {...comment} />
          ))
        )}
      </div>
      <div className="space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          className="min-h-[80px]"
        />
        <Button onClick={handleSubmit} className="w-full">
          Add Comment
        </Button>
      </div>
    </div>
  );
};