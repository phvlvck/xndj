/*
 ******************************************************
 * Professional Business Website - Main JavaScript
 ******************************************************
 * This file contains all the JavaScript functionality
 * for the professional business website, including
 * mobile menu, scroll effects, and other interactive
 * features.
 ******************************************************
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('fa-times');
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate Elements on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature, .service, .mvv-item, .team-member, .portfolio-item, .process-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature, .service, .mvv-item, .team-member, .portfolio-item, .process-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Form Submission Handling (for contact form)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to the server here
            // For demonstration, we'll just show an alert
            alert('شكرًا لتواصلك معنا! سنعود إليك في أقرب وقت ممكن.');
            this.reset();
        });
    }
    
    // Portfolio Filter Functionality (if on portfolio page)
    if (document.querySelector('.portfolio-filter')) {
        const filterButtons = document.querySelectorAll('.filter-buttons .btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Portfolio Gallery Functionality (if on portfolio single page)
    if (document.querySelector('.portfolio-gallery')) {
        const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
        const mainImage = document.querySelector('.portfolio-gallery .main-image');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                // Add active class to clicked thumbnail
                this.classList.add('active');
                // Change main image source
                mainImage.src = this.src.replace('-thumb', '-large');
            });
        });
    }
});