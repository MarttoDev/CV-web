// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initCursorTrail();
});

// Smooth scrolling functionality
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            if (validateForm()) {
                // Simulate form submission
                showNotification('¡Gracias por tu mensaje! Te responderé a la brevedad.', 'success');
                contactForm.reset();
            } else {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
            }
        });
    }
}

// Form validation
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
        return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showNotification('Por favor, ingresa un email válido.', 'error');
        return false;
    }
    
    return true;
}

// Notification system
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.skill-category, .project-card, .education-card, .timeline-item');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .skill-category,
    .project-card,
    .education-card,
    .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .skill-category.animate-in,
    .project-card.animate-in,
    .education-card.animate-in,
    .timeline-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .timeline-item:nth-child(odd) {
        transform: translateX(-30px);
    }
    
    .timeline-item:nth-child(even) {
        transform: translateX(30px);
    }
    
    .timeline-item.animate-in {
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

// Download CV functionality (placeholder)
function downloadCV() {
    // This would typically link to a PDF file
    showNotification('La descarga del CV comenzará pronto...', 'success');
    // window.open('path/to/your/cv.pdf', '_blank');
}

// Add download functionality to the button
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('a[href="#"].btn-outline');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadCV();
        });
    }
});

// Efecto de estela de fuego morado
function initCursorTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let lastTime = 0;
    const trailInterval = 16; // ~60fps
    
    // Seguir posición del mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Crear estela continua
    function createTrail() {
        const now = Date.now();
        if (now - lastTime >= trailInterval) {
            createFireParticle(mouseX, mouseY);
            lastTime = now;
        }
        requestAnimationFrame(createTrail);
    }
    
    function createFireParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-trail';
        
        // Posición con pequeño offset aleatorio para efecto de llama
        const offsetX = (Math.random() - 0.5) * 8;
        const offsetY = (Math.random() - 0.5) * 8;
        
        particle.style.left = (x + offsetX) + 'px';
        particle.style.top = (y + offsetY) + 'px';
        
        // Tamaño aleatorio para efecto más orgánico
        const size = Math.random() * 8 + 8;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.3 + 0.7;
        
        document.body.appendChild(particle);
        
        // Remover después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 800);
    }
    
    // Efecto especial al hacer click
    document.addEventListener('click', (e) => {
        createFireExplosion(e.clientX, e.clientY);
    });
    
    function createFireExplosion(x, y) {
        // Crear múltiples partículas para efecto de explosión
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                createFireParticle(x, y);
            }, i * 30);
        }
        
        // Partícula central más grande
        const mainParticle = document.createElement('div');
        mainParticle.className = 'cursor-trail';
        mainParticle.style.left = x + 'px';
        mainParticle.style.top = y + 'px';
        mainParticle.style.width = '25px';
        mainParticle.style.height = '25px';
        mainParticle.style.background = 'radial-gradient(circle, #ff00ff, #cc00ff, #9900ff)';
        mainParticle.style.boxShadow = '0 0 30px #ff00ff, 0 0 60px #cc00ff';
        
        document.body.appendChild(mainParticle);
        
        setTimeout(() => {
            if (mainParticle.parentNode) {
                mainParticle.parentNode.removeChild(mainParticle);
            }
        }, 600);
    }
    
    createTrail();
}
