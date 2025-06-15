let currentPencilSize = 5; 
let lastcolor="#000000"
let currentColor = '#000000'; 

const pencilBtn = document.getElementById("pencilBtn");
const colorBtn = document.getElementById("colorBtn");
const fillBtn=document.getElementById("fillBtn")
const eraseBtn=document.getElementById("eraseBtn")

const pencilSizeDropdown = document.getElementById("pencilSizeDropdown");
const colorPickerDropdown = document.getElementById("colorPickerDropdown");

pencilBtn.addEventListener("click", function() {
    pencilSizeDropdown.style.display = (pencilSizeDropdown.style.display === "none" || pencilSizeDropdown.style.display === "") ? "block" : "none";
    colorPickerDropdown.style.display = "none"; 
    currentColor=lastcolor;
});

colorBtn.addEventListener("click", function() {
    colorPickerDropdown.style.display = (colorPickerDropdown.style.display === "none" || colorPickerDropdown.style.display === "") ? "block" : "none";
    pencilSizeDropdown.style.display = "none";
})

fillBtn.addEventListener("click",function(){
    colorPickerDropdown.style.display = "none";
    ctx.fillStyle = currentColor; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
})

eraseBtn.addEventListener("click",function(){
    currentColor="#FFFF";
})

document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", function () {
        currentPencilSize = this.getAttribute("data-size"); 
        pencilSizeDropdown.style.display = "none"; 
    });
});

document.getElementById("colorInput").addEventListener("input", function() {
    currentColor = this.value;
    lastcolor=currentColor;
    document.getElementById("currcol").style.backgroundColor=this.value;
    colorPickerDropdown.style.display = "none"; 
});



document.getElementById("saveBtn").addEventListener("click", function(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "drawing.png"; 

    link.click();
});


const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let isDrawing = false;
let lastX = 0;  
let lastY = 0;  

canvas.addEventListener("mousedown", function(event) {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener("mouseup", function() {
    isDrawing = false;
});

canvas.addEventListener("mousemove", function(event) {
    if (!isDrawing) return;  
    pencilSizeDropdown.style.display = "none"; 
    colorPickerDropdown.style.display = "none"; 
    const currentX = event.offsetX;
    const currentY = event.offsetY;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentPencilSize;
    ctx.lineCap = "round"; 
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY); 
    ctx.lineTo(currentX, currentY);  
    ctx.stroke();  

    lastX = currentX;
    lastY = currentY;
});
