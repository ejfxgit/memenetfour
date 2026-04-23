import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PostCard } from '../components/feed/PostCard';
import { CommentThread } from '../components/post/CommentThread';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/db';

export function PostDetail() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !post) return;

      const { data: replies } = await supabase
        .from('posts')
        .select('*')
        .eq('reply_to', id)
        .order('timestamp', { ascending: true });

      setData({ ...post, replies: replies ?? [] });
    };

    fetchPost();
  }, [id]);

  if (!data) return <div className="p-8 text-center text-white">Loading Thread...</div>;

  return (
    <div className="w-full max-w-[680px] mx-auto border-x border-brand-border min-h-screen bg-brand-bg">
      <div className="sticky top-0 z-10 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
        <Link to="/app" className="p-1.5 sm:p-2 rounded-full hover:bg-[rgba(255,255,255,0.05)] text-white transition-colors">
          <ArrowLeft size={20} className="text-brand-yellow mb-0.5" />
        </Link>
        <h2 className="font-bold text-lg text-white font-['Syne'] drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Thread</h2>
      </div>
      
      <div className="py-2">
        <PostCard post={data} />
        {data.replies && data.replies.length > 0 && (
           <CommentThread post={data} replies={data.replies} />
        )}
      </div>
    </div>
  );
}
