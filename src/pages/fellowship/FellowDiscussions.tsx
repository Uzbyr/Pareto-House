
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const FellowDiscussions = () => {
  const handleJoinGroup = () => {
    // Replace this URL with your actual WhatsApp group invitation link
    window.open('https://chat.whatsapp.com/your-group-invite-link', '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Fellowship Discussions</h1>
        <p className="text-gray-400 mt-2">
          Join our WhatsApp group to connect with fellow members and participate in discussions
        </p>
      </div>

      <Card className="bg-zinc-800 border-zinc-700 p-8 max-w-md mx-auto text-center">
        <SiWhatsapp className="w-16 h-16 mx-auto mb-4 text-[#25D366]" />
        <h2 className="text-xl font-semibold text-white mb-4">Join our Fellowship WhatsApp Group</h2>
        <p className="text-gray-400 mb-6">
          Connect with other fellows, share resources, and stay updated with important announcements
        </p>
        <Button 
          onClick={handleJoinGroup}
          className="bg-[#25D366] hover:bg-[#20BD5A] text-white"
          size="lg"
        >
          <SiWhatsapp className="w-5 h-5 mr-2" />
          Join WhatsApp Group
        </Button>
      </Card>
    </div>
  );
};

export default FellowDiscussions;
