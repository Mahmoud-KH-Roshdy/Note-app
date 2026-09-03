import { FiFileText } from 'react-icons/fi';
import { useUi } from '../context/UiContext';
export default function EmptyNotes() {
    const {showFormMobile}= useUi()
    return (
        <div className={`flex flex-col items-center justify-center h-screen  text-center px-6 py-12 overflow-hidden ${showFormMobile ? `hidden` : `flex flex-col`}` }>
            <div className="w-16 h-16 rounded-full bg-[#F4F5F7] flex items-center justify-center mb-4">
                <FiFileText size={28} className="text-[#D64E51]" strokeWidth={1.5} />
            </div>
            <h3 className="text-gray-900 font-medium text-[15px] mb-1">No notes yet</h3>
            <p className="text-gray-400 text-sm">Create your first note to get started</p>
        </div>
    )
}
