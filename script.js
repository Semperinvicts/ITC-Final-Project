document.addEventListener('DOMContentLoaded', function() {
    // Background Slideshow
    const backgroundImages = [
        'https://tripjive.com/wp-content/uploads/2024/09/Top-10-Things-to-Do-in-Palawan.jpg', // Palawan
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/1d/55/bd/calle-crisologo-vigan.jpg?w=1200&h=-1&s=1', // Vigan
        'https://files01.pna.gov.ph/ograph/2018/10/19/lake-danao-1.jpg', // Danao
        'https://www.swedishnomad.com/wp-content/images/2018/09/places-to-visit-in-the-philippines.jpg', // Banaue Rice
        'https://www.swedishnomad.com/wp-content/images/2018/09/mayon-volcano.jpg.webp', // Mayon
    ];

    // Create a container for background images
    const backgroundContainer = document.createElement('div');
    backgroundContainer.style.position = 'fixed';
    backgroundContainer.style.top = '0';
    backgroundContainer.style.left = '0';
    backgroundContainer.style.width = '100%';
    backgroundContainer.style.height = '100%';
    backgroundContainer.style.zIndex = '-1';
    backgroundContainer.style.overflow = 'hidden';

    // Create two div elements for crossfading background images
    const backgroundImage1 = document.createElement('div');
    const backgroundImage2 = document.createElement('div');

    // Set common styles for background images
    [backgroundImage1, backgroundImage2].forEach(img => {
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
        img.style.opacity = '0'; // Initially, set both images to be hidden
        img.style.transition = 'opacity 2s ease-in-out'; // Transition opacity to create the fade effect
    });

    // Append images to the container and container to the body
    backgroundContainer.appendChild(backgroundImage1);
    backgroundContainer.appendChild(backgroundImage2);
    document.body.appendChild(backgroundContainer);

    let currentImageIndex = 0;

    function changeBackground() {
        // Fade out the current visible background
        const currentBackgroundImage = (backgroundImage1.style.opacity === '1') ? backgroundImage1 : backgroundImage2;
        const nextBackgroundImage = (currentBackgroundImage === backgroundImage1) ? backgroundImage2 : backgroundImage1;

        currentBackgroundImage.style.opacity = '0';
        nextBackgroundImage.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`; 
        nextBackgroundImage.style.opacity = '1'; 

        // Move to the next image in the array
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }

    
    backgroundImage1.style.backgroundImage = `url(${backgroundImages[0]})`;
    backgroundImage1.style.opacity = '1'; // Make the first image visible

    
    setInterval(changeBackground, 3000); 
});


// Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
     
        [name, email, message].forEach(field => {
            field.classList.remove('error');
        });
        
        // Check if fields are filled
        if (name.value.trim() === '') {
            name.classList.add('error');
            isValid = false;
        }
        
        if (email.value.trim() === '' || !isValidEmail(email.value)) {
            email.classList.add('error');
            isValid = false;
        }
        
        if (message.value.trim() === '') {
            message.classList.add('error');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

// Email validation function
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Destination Details Reveal
const destinationDetails = {
    'Palawan': {
        description: "Palawan is a breathtaking island province in the Philippines, often celebrated as one of the world's most beautiful destinations. Located in the western Philippine archipelago, it offers a stunning landscape of crystal-clear turquoise waters, limestone cliffs, and lush tropical forests.",
        highlights: [
            "Underground River - A UNESCO World Heritage Site",
            "El Nido's Limestone Cliffs and Lagoons",
            "Coron's World-Class Diving Sites",
            "Honda Bay Island Hopping",
            "Port Barton's Pristine Beaches"
        ],
        bestTime: "November to May (Dry Season)",
        activities: "Island hopping, diving, snorkeling, kayaking, beach camping"
    },
    'Vigan': {
        description: "Vigan is famous for its exceptionally well-preserved Spanish colonial architecture, particularly along Calle Crisologo, where cobblestone streets are lined with ancestral houses featuring distinctive Spanish-Filipino architectural styles.",
        highlights: [
            "Calle Crisologo - Historic Cobblestone Street",
            "Plaza Salcedo - Dancing Fountain Show",
            "Vigan Cathedral",
            "Bantay Church and Bell Tower",
            "Hidden Garden"
        ],
        bestTime: "December to May",
        activities: "Heritage tours, food trips, kalesa rides, pottery making"
    },
    'Danao': {
        description: "Lake Danao is a serene natural attraction set within a protected landscape. The lake is situated in Lake Danao Natural Park and is surrounded by lush forest, making it a popular destination for nature lovers, hikers, and those seeking tranquil scenery.",
        highlights: [
            "Lake Danao Natural Park",
            "Mountain Hiking Trails",
            "Bird Watching Spots",
            "Camping Areas",
            "Picnic Grounds"
        ],
        bestTime: "March to May",
        activities: "Kayaking, camping, hiking, bird watching, picnicking"
    }
};

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function() {
        const destination = this.getAttribute('data-destination');
        const card = this.closest('.destination-card');
        const details = destinationDetails[destination];
        
        // Check if details section already exists
        let detailsSection = card.querySelector('.destination-details');
        
        if (!detailsSection) {
            // Create details section if it doesn't exist
            detailsSection = document.createElement('div');
            detailsSection.className = 'destination-details';
            
           
            detailsSection.innerHTML = `
                <h3>About ${destination}</h3>
                <p>${details.description}</p>
                <h4>Highlights</h4>
                <ul>
                    ${details.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
                <p><strong>Best Time to Visit:</strong> ${details.bestTime}</p>
                <p><strong>Activities:</strong> ${details.activities}</p>
            `;
            
            // Create close button
            const closeButton = document.createElement('button');
            closeButton.className = 'close-details';
            closeButton.innerHTML = '×';
            closeButton.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('expanded');
            });
            
            card.appendChild(closeButton);
            card.querySelector('.destination-info').appendChild(detailsSection);
        }
        
        // Toggle expanded state
        card.classList.toggle('expanded');
    });
});


// Mobile Navigation Toggle
function setupMobileMenu() {
    const nav = document.querySelector('nav');
    
   
    if (!document.querySelector('.mobile-menu-icon')) {
        const mobileMenuIcon = document.createElement('div');
        mobileMenuIcon.classList.add('mobile-menu-icon');
        mobileMenuIcon.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        nav.insertBefore(mobileMenuIcon, nav.querySelector('ul'));

       
        mobileMenuIcon.addEventListener('click', function() {
            const navUl = nav.querySelector('ul');
            navUl.classList.toggle('active');

            
            this.classList.toggle('open');
        });
    }
}


setupMobileMenu();


document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const navUl = nav.querySelector('ul');
    const mobileMenuIcon = nav.querySelector('.mobile-menu-icon');

    if (navUl.classList.contains('active') && 
        !nav.contains(event.target) && 
        event.target !== mobileMenuIcon) {
        navUl.classList.remove('active');
    }
});



