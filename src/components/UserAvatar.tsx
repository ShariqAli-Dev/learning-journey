import { User } from "next-auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

interface Props {
  user: User;
}

export default async function UserAvatar({ user }: Props) {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image}
            alt="user profile"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
}
