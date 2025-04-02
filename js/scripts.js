/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

const container = document.getElementById("three-js-container");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });

        // Set renderer size to match container
        function updateRendererSize() {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
        updateRendererSize();
        container.appendChild(renderer.domElement);

        // Particle system
        const particleCount = 5000;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Create a circular texture
        const createParticleTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(16, 16, 14, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            return new THREE.CanvasTexture(canvas);
        };

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * containerWidth;     // X
            positions[i + 1] = (Math.random() - 0.5) * containerHeight; // Y
            positions[i + 2] = (Math.random() - 0.5) * 500;            // Z
            colors[i] = 0.23;     // R (blue-400: #3b82f6)
            colors[i + 1] = 0.51; // G
            colors[i + 2] = 0.96; // B
        }

        particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        // Use PointsMaterial with texture
        const material = new THREE.PointsMaterial({
            size: 1, // Adjust size as needed
            vertexColors: true,
            map: createParticleTexture(),
            transparent: true,
            depthWrite: false // Helps with rendering order
        });

        const particleSystem = new THREE.Points(particles, material);
        scene.add(particleSystem);

        camera.position.z = 500;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            particleSystem.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Optional: Close menu when clicking a link
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
});

// Scroll Indicator Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Desktop elements
    const desktopLinks = document.querySelectorAll('.scroll-link');
    // Mobile elements
    const mobileDots = document.querySelectorAll('.mobile-scroll-dot');
    const mobileIndicator = document.getElementById('mobile-scroll-indicator');
    const sections = document.querySelectorAll('section');

    // Function to update active indicators (both desktop and mobile)
    function updateActiveIndicator() {
        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        // Special case for top (#hero)
        if (window.scrollY < sections[0].clientHeight / 2) {
            current = 'hero';
        }

        // Special case for bottom (#contact)
        if (window.scrollY + windowHeight >= documentHeight - 50) {
            current = 'contact';
        }

        // Update desktop links
        desktopLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });

        // Update mobile dots
        mobileDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    }

    // Smooth scrolling for desktop links
    desktopLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Smooth scrolling for mobile dots
    mobileDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Fade out mobile indicator during scroll, fade in when stopped
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        mobileIndicator.classList.add('hidden');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            mobileIndicator.classList.remove('hidden');
        }, 150); // Show after 150ms of no scrolling
    });

    // Update on scroll
    window.addEventListener('scroll', updateActiveIndicator);

    // Initial update
    updateActiveIndicator();

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});

// Scroll Indicator Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Desktop elements
    const desktopLinks = document.querySelectorAll('.scroll-link');
    // Mobile elements
    const mobileDots = document.querySelectorAll('.mobile-scroll-dot');
    const mobileIndicator = document.getElementById('mobile-scroll-indicator');
    const sections = document.querySelectorAll('section');

    // Function to update active indicators (both desktop and mobile)
    function updateActiveIndicator() {
        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        // Special case for top (#hero)
        if (window.scrollY < sections[0].clientHeight / 2) {
            current = 'hero';
        }

        // Special case for bottom (#contact)
        if (window.scrollY + windowHeight >= documentHeight - 50) {
            current = 'contact';
        }

        // Update desktop links
        desktopLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });

        // Update mobile dots
        mobileDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    }

    // Smooth scrolling for desktop links
    desktopLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Smooth scrolling for mobile dots
    mobileDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Fade out mobile indicator during scroll, fade in when stopped
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        mobileIndicator.classList.add('hidden');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            mobileIndicator.classList.remove('hidden');
        }, 150); // Show after 150ms of no scrolling
    });

    // Update on scroll
    window.addEventListener('scroll', updateActiveIndicator);

    // Initial update
    updateActiveIndicator();

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});

// Dynamically adjust hero padding based on nav height
function adjustHeroPadding() {
    const nav = document.querySelector('nav');
    const hero = document.getElementById('hero');
    const navHeight = nav.offsetHeight;

    if (window.innerWidth < 1024) { // Mobile
        hero.style.paddingTop = `${navHeight}px`;
        if (window.matchMedia("(orientation: landscape)").matches) {
            hero.style.minHeight = `calc(150vh - ${navHeight}px)`;
        } else {
            hero.style.minHeight = '100vh'; // Reset for portrait
        }
    } else {
        hero.style.paddingTop = ''; // Reset for desktop
        hero.style.minHeight = '100vh';
    }
}

// Run on load and resize
window.addEventListener('load', adjustHeroPadding);
window.addEventListener('resize', adjustHeroPadding);