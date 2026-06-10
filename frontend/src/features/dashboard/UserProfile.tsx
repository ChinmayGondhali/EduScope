import { User as UserIcon, Mail, Calendar, MapPin, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { User } from "@/types";

interface UserProfileProps {
  user: User;
  onEdit?: () => void;
}

export function UserProfile({ user, onEdit }: UserProfileProps) {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-lg overflow-hidden">
            <UserIcon className="h-12 w-12 text-primary" />
          </div>
          <button 
            onClick={onEdit}
            className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Edit2 className="h-3 w-3" />
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-1">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 font-medium">
              <Mail className="h-4 w-4" />
              {user.email}
            </div>
            <div className="flex items-center gap-1 font-medium">
              <Calendar className="h-4 w-4" />
              Joined {new Date(user.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEdit}
          className="shrink-0 font-bold"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
