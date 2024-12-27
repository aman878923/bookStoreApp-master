import { useState } from 'react';
import ChatInterface from './ChatInterface';
import { useAuth } from '../../context/AuthProvider';

const ChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { token } = useAuth();

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!token) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 btn btn-primary btn-circle"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>
            {isOpen && <ChatInterface onClose={handleClose} />}
        </>
    );
};

export default ChatButton;
