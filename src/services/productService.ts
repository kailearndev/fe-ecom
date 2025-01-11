import apiService from "./api"


const getProduct = async () => {
    const response = await apiService.get('/product')
    return response.data

}
const sendWebhook = async (data: any) => {
    const response = await apiService.post('/webhook', data)
    return response
};
export const ProductService = {
    getProduct,
    sendWebhook
}