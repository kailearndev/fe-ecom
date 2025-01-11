import { useEffect, useState } from "react";
import { ProductService } from "../services/productService";
import useCartStore from "../store/cartStore";

interface DataResponse {
    id: number
    image: string
    price: string
    name: string
    quantity: number

}

const Home = () => {
    const [data, setData] = useState<Omit<DataResponse[], 'quantity'>>([])
    const { addItem, cartItems } = useCartStore();
    useEffect(() => {
        handleGetProduct()
    }, [])

    const handleGetProduct = async () => {
        const res = await ProductService.getProduct()
        setData(res)

    }
    const handleAddCart = (id: number) => {
        const cartAdd = data.find((item) => item.id == id)
        if (cartAdd) {
            addItem(cartAdd)
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    return (
        <div className="flex justify-center items-center flex-col px-6">
            <div className="grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 grid">
                {data.map((item) =>
                    <div key={item.id} className="p-5 card lg:card-side bg-base-100 shadow-xl hover:scale-105 hover:transition-all hover:cursor-pointer">
                        <figure className="w-64 h-64 ">
                            <img
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
        </div>
    );
};

export default Home;