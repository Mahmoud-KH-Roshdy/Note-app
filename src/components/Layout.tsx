import Sidebar from './Sidebar';
import { Outlet } from 'react-router';
export default function Layout() {
    return (
        <div className="h-screen  flex">
            <Sidebar />
            <div className="flex-1 ">
                <Outlet />
            </div>
        </div>
    )
}
