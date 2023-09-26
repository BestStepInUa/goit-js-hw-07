import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);

const gallaryList = document.querySelector('.gallery');
const gallaryMarkup = createGallaryItemsMarkup(galleryItems);
// Adding generated markup
gallaryList.insertAdjacentHTML('beforeend', gallaryMarkup);
// Delegating the image click event
gallaryList.addEventListener('click', onGallaryImgClick)

// Generate gallary img function
function createGallaryItemsMarkup(gallary) {
    return gallary.map(({ preview, original, description }) => {
        return `
            <li class='gallery__item'>
                <a class='gallery__link' href='${original}'>
                <img class='gallery__image lazyload' data-source='${original}' data-src='${preview}' src='${preview}' alt='${description}' />
                </a>
            </li>
            `;
    }).join('');
}

// Image click event handler
function onGallaryImgClick(e) {
    // Check for a click exclusively on image
    const isGallaryImg = e.target.classList.contains('gallery__image');
    if (!isGallaryImg) {
        return;
    }

    // Prevent default image download
    e.preventDefault();

    // Get a link to the original image
    const originalImgLink = e.target.dataset.source;

    // Creat modal window
    const modalWindow = basicLightbox.create(`
        <div class="modal">
            <img src="${originalImgLink}" >
        </div>
    `,

    // Add close via ESC Key functional for modal window
    {
        onShow: () => {
            document.addEventListener("keydown", onEscInModal);
        },
        onClose: () => {
            document.removeEventListener("keydown", onEscInModal)
        }
    }        
    );

    // Open modal window
    modalWindow.show();

     // Сlosed model window via ESC Key handler
    function onEscInModal (e) {
            if (e.key === "Escape") {
                modal.close();
        }
    } 
}