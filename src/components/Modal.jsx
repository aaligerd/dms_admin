import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal box */}
            <div className={`relative w-full ${maxWidth} mx-auto z-[10000]`}>
                <div className="flex flex-col w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-3xl text-gray-700 dark:text-white"
                        >
                            ×
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
