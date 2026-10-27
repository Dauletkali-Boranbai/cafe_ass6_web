/* gallery.js - image viewer. Clicking a thumbnail changes the src of the big image. */

const mainImage = document.getElementById("mainImage");
const mainCaption = document.getElementById("mainCaption");
const thumbnails = document.querySelectorAll(".thumb");

function showImage(thumb) {
    const img = thumb.querySelector("img");

    mainImage.setAttribute("src", thumb.dataset.src);
    mainImage.setAttribute("alt", img.getAttribute("alt"));
    mainCaption.textContent = thumb.dataset.caption;

    // mark the active thumbnail
    thumbnails.forEach(function (item) {
        item.classList.toggle("active", item === thumb);
    });

    // fade animation on every change
    mainImage.classList.remove("fade-in");
    void mainImage.offsetWidth;
    mainImage.classList.add("fade-in");
}

if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(function (thumb) {
        thumb.addEventListener("click", function () {
            showImage(thumb);
            playSound("click");
        });
    });
}
