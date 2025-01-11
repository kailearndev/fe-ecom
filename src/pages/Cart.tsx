import { useNavigate } from "react-router";
import useCartStore from "../store/cartStore";
import ModalConfirm from "../layouts/modalconfirm";
import { useRef, useState } from "react";
import { ProductService } from "../services/productService";
import QRCode from "react-qr-code";
import toast, { Toaster } from "react-hot-toast";


const Cart = () => {
    const notify = () => toast.success('Thanh toán thành công ');

    const { cartItems, getTotalPrice, removeItem, clearStore } = useCartStore();
    const modalRef = useRef<HTMLDialogElement>(null)
    const handlePayment = () => {
        if (modalRef.current) {
            modalRef.current.showModal(); // Mở modal
        }

    }

    const handleScan = async () => {
        const res = await ProductService.sendWebhook({
            cartItems
        });
        console.log(res);

        if (res) {
            await notify()
            modalRef.current?.close()
            clearStore()
            navigate('/')
        }

    };


    const navigate = useNavigate()
    return (
        <div className="px-10 py-5 bg-white text-black rounded-lg shadow-xl  border">
            <div className="flex flex-col gap-7 ">
                {
                    cartItems.length ?
                        cartItems.map((item) =>
                            <div key={item.id} className="grid grid-cols-1 gap-4 items-center md:grid-cols-4 lg:grid-cols-5 md:items-center border rounded-md hover:cursor-pointer hover:bg-slate-50 hover:transition-all p-5 ">
                                <img loading="lazy" className="w-28    hover:bg-slate-50 bg-white rounded-2xl " src={item.image} alt={item.name} />
                                <div className=" flex md:flex-col gap-3 ">
                                    <span className="flex-1 block font-semibold">
                                        Tên sản phẩm:
                                    </span>
                                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-pretty">
                                        {item.name}
                                    </span>


                                </div>
                                <div className="flex md:flex-col gap-3 ">
                                    <span className="font-semibold">
                                        Giá:
                                    </span>
                                    <div className="badge badge-success ">

                                        {Number(item.price).toLocaleString()} VND
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-3 ">
                                    <span>
                                        Số Lượng:
                                    </span>
                                    <div className="badge badge-warning  ">

                                        {item.quantity}
                                    </div>
                                </div>
                                <button onClick={() => removeItem(item)} className="btn w-20">Xóa</button>

                            </div>
                        ) :
                        <div className="flex gap-5 justify-center items-center text-sm">
                            Không có sản phẩm
                            <button onClick={() => navigate('/')} className="btn btn-neutral">Trang chủ</button>
                        </div>
                }

                {getTotalPrice() > 0 && <div className="justify-end items-center flex gap-7">
                    <span className="text-sm font-semibold">
                        Thành tiền:
                    </span>
                    <span>
                        {getTotalPrice().toLocaleString()} VND
                    </span>
                    <button onClick={handlePayment} className="btn btn-secondary ">Thanh toán</button>
                </div>
                }

            </div>
            <button onClick={() => navigate('/')} className=" text-sm  btn btn-neutral btn-circle fixed right-10 bottom-10 animate-pulse">
                Home
            </button>
            <ModalConfirm modalRef={modalRef} content={
                <div className="flex gap-5 flex-col justify-center items-center">
                    <QRCode className="w-36" value={"Thanh toán đi má "} />
                    <button onClick={handleScan} className=" btn btn-primary">
                        Đã pay
                    </button>
                </div>

            } />
            <Toaster />
        </div >
    );
};

export default Cart;