import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const SafetyLevelModal = ({ isOpen, onClose, onSubmit }) => {
  const [safetyLevel, setSafetyLevel] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!safetyLevel) {
      alert('Please select a safety level');
      return;
    }
    onSubmit({ safetyLevel, message });
    setSafetyLevel('');
    setMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Safety Level</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={safetyLevel} onValueChange={setSafetyLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select safety level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="green">Safe</SelectItem>
              <SelectItem value="yellow">Caution</SelectItem>
              <SelectItem value="red">Danger</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Enter safety message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SafetyLevelModal;