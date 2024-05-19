import { Button } from "@/components/ui/button";
import Image from "next/image";
import { tokens } from "@/tokens";
import { Balance } from "../ui/balance";
import { USDBalance } from "../ui/usd-balance";

export function Friends() {
    const friends = [
        { name: "Arjan", image: "/svg/profiles/profile1.svg", balance: "10000.0" },
        { name: "Kacper", image: "/svg/profiles/profile2.svg", balance: "5000.0" },
        { name: "Scott", image: "/svg/profiles/profile3.svg", balance: "2500.0" },
        { name: "Thomas", image: "/svg/profiles/profile4.svg", balance: "7500.0" },
      ];

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Your Friends</h2>
      <p className="text-sm text-gray-500 mb-4">See All Friends</p>
      <div className="flex flex-col space-y-4">
        {friends.map((friend, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex items-center space-x-4">
              <Image className="h-12 w-12 rounded-full" src={friend.image} alt={friend.name} width={48} height={48} />
              <div>
                <p className="text-sm font-semibold">{friend.name}</p>
                {tokens["0"] && (
                  <>
                    <p className="text-xs text-gray-400">
                      Balance: <Balance balance={friend.balance} tokenId="0" /> {tokens["0"].ticker}
                    </p>
                    <p className="text-xs text-gray-400">
                      (<USDBalance balance={friend.balance} tokenId="0" />)
                    </p>
                  </>
                )}
              </div>
            </div>
            <Button variant="outline" className="text-xs border-white text-white">Send 💸</Button>          </div>
        ))}
      </div>
    </div>
  );
}
