var audio;
const sampleImages = document.querySelectorAll(".audio-image");

sampleImages.forEach(img => {
    img.addEventListener("click", () => {
        const sound = new Audio(img.dataset.sound);
        sound.play();
    });
});
