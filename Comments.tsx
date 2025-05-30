import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: number;
}

const Comments: React.FC = () => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Devi effettuare l\'accesso per commentare');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Il commento non può essere vuoto');
      return;
    }

    // Sanitize comment content
    const sanitizedContent = newComment
      .trim()
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const comment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg',
      content: sanitizedContent,
      timestamp: Date.now()
    };

    const updatedComments = [comment, ...comments];
    saveComments(updatedComments);
    setNewComment('');
    toast.success('Commento pubblicato con successo!');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Commenti</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          {user ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user.avatar || "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Scrivi un commento..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006D5B] focus:border-[#006D5B] min-h-[100px] resize-y"
                aria-label="Contenuto del commento"
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#006D5B] text-white rounded-lg hover:bg-[#005A4B] transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Pubblica</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-2">Effettua l'accesso per commentare</p>
              <button
                type="button"
                onClick={() => toast.error('Implementare login')}
                className="text-[#006D5B] hover:text-[#005A4B] font-medium"
              >
                Accedi →
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Non ci sono ancora commenti. Sii il primo a commentare!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-gray-900">{comment.userName}</span>
                    <span className="text-sm text-gray-500">{formatDate(comment.timestamp)}</span>
                  </div>
                  <p className="mt-2 text-gray-700 whitespace-pre-line">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;