import { useEffect } from 'react';

type PopupProps = {
    data: {
        success: boolean;
        message: string;
    } | null;
    onClose: () => void;
};

export default function Popup({ data, onClose }: PopupProps) {
    useEffect(() => {
        if (data?.message) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [data, onClose]);

    if (!data || data.message === '') {
        return null;
    }

    const resultClass = data.success ? 'bg-green-500/90 border-green-300' : 'bg-red-500/90 border-red-300';

    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded-2xl shadow-lg text-white transition-all ${resultClass}`}>
            <div className="flex items-center justify-between gap-4">
                <span>{data.message}</span>
                <button onClick={onClose} className="text-white font-bold text-lg">
                    &times;
                </button>
            </div>
        </div>
    );
}
