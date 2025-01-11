import { useEffect, useState } from "react";
import { ProductService } from "../services/productService";
import useCartStore from "../store/cartStore";
import Loading from "../layouts/loading";
import toast, { Toaster } from "react-hot-toast";

interface DataResponse {
    id: number
    image: string
    price: string
    name: string
    quantity: number

}

const Home = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Omit<DataResponse[], 'quantity'>>([])
    const { addItem, cartItems } = useCartStore();
    useEffect(() => {
        handleGetProduct()
    }, [])
    const notify = () => toast.success('Thêm vào giỏ hành thành công', {
        icon: <div className="animate-pulse">
            👏
        </div>,
    });
    const handleGetProduct = async () => {
        setLoading(true)
        const res = await ProductService.getProduct()
        setData(res)
        setLoading(false)

    }
    const handleAddCart = (id: number) => {
        const cartAdd = data.find((item) => item.id == id)
        if (cartAdd) {
            addItem(cartAdd)
            notify()


        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    return (
        <div className="flex justify-center items-center flex-col px-6">
            {loading && <Loading />}
            <div className=" grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-5 ">
                {data.map((item) =>
                    <div key={item.id} className="p-5 card lg:card-side bg-base-100 shadow-xl hover:scale-105 hover:transition-all hover:cursor-pointer">
                        <figure className="w-64 h-64 ">
                            <img
                                loading="lazy"
                                className="rounded-lg"
                                src={item.image}
                                alt={item.name} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.name}</h2>
                            <p>{`${Number(item.price).toLocaleString('vn-VN')} VND`}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleAddCart(item.id)} className="btn btn-primary">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                )


                }
            </div>
            <Toaster />
        </div>
    );
};

export default Home;