import React from 'react';
import { Card, CardContent } from '../../components/ui/card'; // Fix import path

export const CommentItem = ({ author, timestamp, text }) => (
  <Card className="bg-gray-50">
    <CardContent className="p-3">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>{author}</span>
        <span>{timestamp}</span>
      </div>
      <p className="text-sm">{text}</p>
    </CardContent>
  </Card>
);