"use client";

import { useState } from "react";
import { Share2, Link, Check } from "lucide-react";

interface ShareButtonProps {
  title?: string;
  text?: string;
  className?: string;
}

export function ShareButton({ 
  title = "골라줘", 
  text = "생각하기 귀찮을 때 그냥 누르는 사이트",
  className = ""
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        setShowMenu(true);
      }
    } else {
      setShowMenu(true);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    }
  };

  const shareToKakao = () => {
    const url = window.location.href;
    const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(url)}`;
    window.open(kakaoUrl, "_blank", "width=600,height=400");
    setShowMenu(false);
  };

  const shareToTwitter = () => {
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
    setShowMenu(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <Share2 className="h-4 w-4" />
        공유하기
      </button>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)} 
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <button
              onClick={copyLink}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">복사됨!</span>
                </>
              ) : (
                <>
                  <Link className="h-4 w-4" />
                  <span>링크 복사</span>
                </>
              )}
            </button>
            <button
              onClick={shareToTwitter}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X (Twitter)</span>
            </button>
            <button
              onClick={shareToKakao}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.635 1.754 4.952 4.39 6.295-.14.53-.505 1.925-.578 2.227-.092.38.14.374.293.272.121-.08 1.923-1.307 2.703-1.837.742.11 1.51.168 2.292.168 5.523 0 10-3.463 10-7.691S17.523 3 12 3z" />
              </svg>
              <span>카카오스토리</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
