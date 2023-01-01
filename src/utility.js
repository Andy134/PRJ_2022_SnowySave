


export const util = {
    getLocalCurrency
}

function getLocalCurrency(amount){
    amount = amount || 0 
    return amount?.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})
}