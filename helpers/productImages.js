exports.productImage = arr => {
    const images = [];
    for (let i = 0 ; i < arr.length ; i++) {
        images.push(arr[i].filename)
    }
    return images;
}