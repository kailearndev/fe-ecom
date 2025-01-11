import apiService from "./api"


const getProduct = async () => {
    const response = await apiService.get('/product')
    return response.data

}

export const ProductService = {
    getProduct
}