import { useNavigate } from "react-router";
import useCartStore from "../store/cartStore";

const Cart = () => {
    const { cartItems, getTotalPrice, removeItem } = useCartStore();

    const navigate = useNavigate()
    return (
        <div className="px-10 py-5 bg-white text-black rounded-lg shadow-xl  border">
            <div className="flex flex-col gap-7 ">
                {
                    cartItems.length ?
                        cartItems.map((item) =>
                            <div key={item.id} className="grid grid-cols-5 items-center border rounded-md hover:cursor-pointer hover:bg-slate-50 hover:transition-all p-5 ">

                                <img className="w-28 hover:bg-slate-50 bg-white rounded-2xl " src={item.image} alt="" />
                                <div className="flex-col ">
                                    <span className="flex-1 block font-semibold">
                                        Tên sản phẩm:
                                    </span>
                                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-pretty">
                                        {item.name}
                                    </span>


                                </div>
                                <div className="flex flex-col gap-3 items-center">
                                    <span className="font-semibold">
                                        Giá:
                                    </span>
                                    <div className="badge badge-success  ">

                                        {Number(item.price).toLocaleString()} VND
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 items-center">
                                    <span>
                                        Số Lượng:
                                    </span>
                                    <div className="badge badge-warning  ">

                                        {item.quantity}
                                    </div>
                                </div>
                                <button onClick={() => removeItem(item)} className="btn  w-20">Xóa</button>

                            </div>
                        ) :
                        <div className="flex gap-5 justify-center items-center">
                            Không có sản phẩm
                            <button onClick={() => navigate('/')} className="btn btn-neutral">Trang chủ</button>
                        </div>
                }

                {getTotalPrice() > 0 && <div className="justify-end items-center flex gap-7">
                    <span className="font-semibold">
                        Thành tiền:
                    </span>
                    <span>
                        {getTotalPrice().toLocaleString()} VND
                    </span>
                    <button onClick={() => navigate('/')} className="btn btn-secondary ">Thanh toán</button>
                </div>
                }

            </div>
            <button onClick={() => navigate('/')} className="  btn btn-neutral btn-circle fixed right-10 bottom-10 animate-pulse">

            </button>

        </div >
    );
};

export default Cart;