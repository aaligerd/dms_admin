import React from 'react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto outline-none focus:outline-none p-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className={`relative w-full ${maxWidth} mx-auto my-auto z-50`}>
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none dark:bg-gray-800">
                    {/* Header */}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none dark:text-white"
                            onClick={onClose}
                        >
                            <span className="bg-transparent text-gray-900 dark:text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    {/* Body */}
                    <div className="relative p-6 flex-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
