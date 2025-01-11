import { FC } from "react";
import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router";

interface NavbarProps {
    children?: React.ReactNode
}


const Navbar: FC<NavbarProps> = (props) => {
    const { children } = props
    const { cartItems, getTotalPrice, clearStore } = useCartStore();


    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('cartItems')
        clearStore()
        navigate('/login')
    }


    return (
        <div className="flex flex-col">
            <div className="navbar bg-base-00 fixed z-10 backdrop-blur-lg ">
                <div className="flex-1">
                    <a onClick={() => navigate('/')} className="btn btn-ghost text-xl hover:rotate-3">👋hihi PC🙂‍↕️</a>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className={`badge badge-neutral indicator-item  `}>{cartItems.length}</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-slate-200  z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                {
                                    !cartItems.length ? <span className="text-sm font-semibold">Giỏ hàng trống</span> :
                                        <>
                                            <span className="text-lg font-bold">{cartItems.length} Sản phẩm</span>
                                            <span className="text-info">
                                                Total:
                                                {
                                                    getTotalPrice().toLocaleString('vn-VN')

                                                }
                                            </span>
                                            <div className="card-actions">
                                                <button onClick={() => navigate('/cart')} className="btn btn-primary btn-block">Xem giỏ hàng</button>
                                            </div></>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                            <li onClick={handleLogout}><a>Đăng xuất</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                {children}
            </div>
        </div>
    );
};

export default Navbar;