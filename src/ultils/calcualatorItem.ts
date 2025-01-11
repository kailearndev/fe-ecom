type T = number; // Định nghĩa kiểu T là number, bạn có thể thay đổi tùy nhu cầu


export const getCalcualator = (arr: T[]) => {
    return arr.reduce((sum, current) => sum + current, 0)
}