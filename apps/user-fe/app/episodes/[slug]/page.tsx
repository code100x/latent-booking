"use client";

import VideoPlayer from "@/app/_components/video/player";
import { CommentSection } from "@/app/_components/video/comments";
import { RecommendedVideos } from "@/app/_components/video/recommended";
import Sheet from "@/app/_components/ui/drawer";
import { useMediaQuery } from "@/app/_hooks/use-media-query";

export default function EpisodePage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const CommentsContent = () => (
    <div className="space-y-6">
      <CommentSection />
    </div>
  );

  const CommentPreview = () => (
    <div className="border-t border-neutral-800 pt-4">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      <Sheet
        trigger={
          <div className="cursor-pointer hover:bg-neutral-800/50 p-2 rounded-lg transition">
            <CommentSection previewMode />
          </div>
        }
      >
        <CommentsContent />
      </Sheet>
    </div>
  );

  return (
    <main className="min-h-screen">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-6">
            {/* Video Player */}
            <div className="w-full aspect-video">
              <VideoPlayer />
            </div>
            {/* Video Info */}
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold text-neutral-50">
                India's Got Latent ft. Ashish Chanchlani | EP 1
              </h1>
            </div>

            {/* Comments: Desktop vs Mobile */}
            {isDesktop ? <CommentsContent /> : <CommentPreview />}
          </div>

          {/* Recommended Videos */}
          <div>
            <RecommendedVideos />
          </div>
        </div>
      </div>
    </main>
  );
}
