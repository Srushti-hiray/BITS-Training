// Array of image URLs
const images = [
    "https://images.ctfassets.net/ihx0a8chifpc/4Yp1F82NF8yN9gUHXMphNz/c254302efb588196d9a607832cb24e28/lorem-picsum-1280x720.jpg?w=1920&q=60&fm=webp",
    "https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg",
    "https://oneuro.net/wp-content/uploads/2021/01/felix-lam-J7fxkhtOqt0-unsplash.jpg",
    "https://picsum.photos/id/10/640/480",
    
];

let currentIndex = 0;

const carouselImage = document.getElementById("carousel-image");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

function updateImage() {
    carouselImage.src = images[currentIndex];
}

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

updateImage();