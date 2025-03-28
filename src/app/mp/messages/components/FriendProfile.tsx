// -------------------------------
// Imports
// -------------------------------
import {ChatHistoryType} from "@/types";
import {UserMinus, X} from "lucide-react";
import Image from "next/image";
import {removeFriend} from "../../mpHandler/friendsHandler";
import UserImage from "../../components/UserImage";
// -------------------------------
// Friend profile component starts here
// -------------------------------
const FriendProfile = ({
  // bio,
  selectedChat,
  setSelectChat,
  setFriend,
}: {
  // bio:string | undefined;
  selectedChat: ChatHistoryType | null;
  setSelectChat: (selectedChat: ChatHistoryType | null) => void;
  setFriend: (settingFriendProfile: boolean) => void;
}) => {
  // -------------------------------
  // Unfriend a friend here
  // -------------------------------
  const onUnfriend = async () => {
    await removeFriend(selectedChat?.friendId);
    setSelectChat(null);
  };
  // -------------------------------
  // Closing friend info sidebar
  // -------------------------------
  const onClose = () => setFriend(false);
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div className="fixed inset-0 bg-transparent" onClick={onClose} aria-hidden="true" />
        <div
          className="w-full sm:w-96 bg-white dark:bg-slate-900 h-full shadow-lg transform transition-transform duration-300 ease-in-out"
          aria-labelledby="friend-profile-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h2
                id="friend-profile-title"
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                {selectedChat?.friendName}&apos;s Profile
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4">
              <div className="flex flex-col items-center mb-6">
                <UserImage {...selectedChat} />
              </div>

              {/* Add more friend information here */}
              <div className="space-y-4 text-center">
                {/* <p className="text-gray-600 dark:text-gray-300">{bio}</p> */}
                
              </div>
            </div>

            <div className="p-4 border-t dark:border-gray-700">
              <button
                onClick={onUnfriend}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                <UserMinus size={20} className="mr-2" />
                Unfriend
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendProfile;
