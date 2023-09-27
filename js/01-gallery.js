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
                <img class='gallery__image lazyload' data-source='${original}' data-src='${preview}' loading='lazy' alt='${description}' />
                </a>
            </li>
            `;
    }).join('');
}

let modalWindow = null;

// Image click event handler
function onGallaryImgClick(e) {
    // Prevent default image download
    e.preventDefault();

    // Check for a click exclusively on image
    // const isGallaryImg = e.target.classList.contains('gallery__image');
    // if (!isGallaryImg)    
    if (e.target.nodeName !=='IMG') {
        return;
    }

    // Get a link to the original image
    const originalImgLink = e.target.dataset.source;

    // Creat modal window
    modalWindow = basicLightbox.create(`
        <div class='modal'>
            <img src='${originalImgLink}' >
        </div>
    `,

    // Add close via ESC Key functional for modal window
    {
        onShow: () => {
            document.addEventListener('keydown', onEscInModal);
        },
        onClose: () => {
            document.removeEventListener('keydown', onEscInModal)
        }
    }        
    );

    // Open modal window
    modalWindow.show();    
}

 // Сlosed model window via ESC Key handler
    function onEscInModal (e) {
            if (e.code !== 'Escape') {
                return;
        }
        modalWindow.close();
    } 

// Native lazy loading or using lazysizes lib
if ('loading' in HTMLImageElement.prototype) {
    console.log('Lazyloading is supported in browser')
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
        
    });
 
} else {
    console.log('Lazyloading ISN\'T supported in browser');
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity = 'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';
    document.body.appendChild(script);
}

// const lazyItems = document.querySelectorAll('.gallery__image');
// lazyItems.forEach(item => {
//     item.addEventListener('load', onImgLoaded, { once: true });
// });

// function onImgLoaded(e) {
//     console.log('Image loaded');
//     e.target.classList.add('image__loaded')
// }