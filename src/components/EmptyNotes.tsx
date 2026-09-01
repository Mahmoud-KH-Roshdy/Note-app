
import { BiPlus } from 'react-icons/bi';
import { FiFileText } from 'react-icons/fi';

export default function EmptyNotes() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12 overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-[#F4F5F7] flex items-center justify-center mb-4">
                <FiFileText size={28} className="text-[#D64E51]" strokeWidth={1.5} />
            </div>
            <h3 className="text-gray-900 font-medium text-[15px] mb-1">No notes yet</h3>
            <p className="text-gray-400 text-sm">Create your first note to get started</p>
            <button
                className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#D64E51] text-white flex items-center justify-center shadow-lg hover:bg-[#c23e41] transition-colors cursor-pointer"
            >
                <BiPlus size={24} />
            </button>
        </div>
    )
}
