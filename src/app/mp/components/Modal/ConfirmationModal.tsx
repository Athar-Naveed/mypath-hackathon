"use client";

import {ConfirmationModalProps} from "@/types";

const ConfirmationModal = ({isOpen, onClose, onConfirm}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-custom-blue p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-dark-primary-text">
          Confirm Deletion
        </h2>
        <p className="mb-6 text-black dark:text-dark-primary-text">
          Are you sure you want to delete your chats?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
