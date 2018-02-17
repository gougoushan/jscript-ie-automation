// 将图片转换为 base64 编码
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/jpeg");
    return dataURL.replace("data:image/jpeg;base64,", ""); 
} 
function main(i) { 
    var img = document.createElement('img'); 
    img.src = '/images/goods/<%= _id %>/carousel' + i + '.jpg'; 
    img.onload = () => { 
      var data = getBase64Image(img);
    }
}
main(i);