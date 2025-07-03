import { useEffect } from 'react';

type PopupProps = {
    data: {
        success: boolean;
        message: string;
        errors?: Record<string, string[]>;
    } | null;
    onClose: () => void;
};

export default function Popup({ data, onClose }: PopupProps) {
    useEffect(() => {
        if (data?.message) {
            const timer = setTimeout(() => {
                onClose();
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [data, onClose]);

    if (!data || data.message === '') {
        return null;
    }

    const resultClass = data.success ? 'bg-green-500/90 border-green-300' : 'bg-red-500/90 border-red-300';

    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded-2xl shadow-lg text-white transition-all ${resultClass}`}>
            <div className="flex items-center justify-between flex-col gap-4">
                <strong>{data.message}</strong>
                {data.errors &&
                    Object.entries(data.errors).map(([key, values]) => (
                        <div key={key}>
                            <ul>
                                {values.map((v, i) => (
                                    <li key={i}>{v}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                <button
                    onClick={onClose}
                    className="text-white font-bold text-lg">
                    &times;
                </button>
            </div>
        </div>
    );
}
