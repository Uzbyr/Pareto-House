
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const FellowDiscussions = () => {
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Discussions</h1>
        <p className="text-gray-400 mt-2">
          Connect with other fellows through our WhatsApp community
        </p>
      </div>

      <Card className="bg-zinc-800 border-zinc-700 p-4 mb-8">
        <div className="w-full overflow-hidden aspect-[3/4] md:aspect-[4/5]">
          {isWhatsAppLoading && (
            <div className="w-full h-full">
              <Skeleton className="w-full h-full bg-zinc-700" />
            </div>
          )}
          <iframe
            src="https://wa.me/+33782351040"
            style={{
              border: "solid 1px #777",
              display: isWhatsAppLoading ? "none" : "block",
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            scrolling="no"
            title="Pareto Fellowship WhatsApp"
            className="rounded-md"
            onLoad={() => setIsWhatsAppLoading(false)}
          />
        </div>
      </Card>
    </div>
  );
};

export default FellowDiscussions;
