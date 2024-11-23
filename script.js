document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate skills on scroll
    const skillsSection = document.querySelector('#skills');
    const skills = document.querySelectorAll('.skill');

    const animateSkills = () => {
        const triggerBottom = window.innerHeight / 5 * 4;
        skills.forEach(skill => {
            const skillTop = skill.getBoundingClientRect().top;
            if (skillTop < triggerBottom) {
                skill.style.opacity = 1;
                skill.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateSkills);

    // Animate projects on scroll
    const projectsSection = document.querySelector('#projects');
    const projects = document.querySelectorAll('.project');

    const animateProjects = () => {
        const triggerBottom = window.innerHeight / 5 * 4;
        projects.forEach((project, index) => {
            const projectTop = project.getBoundingClientRect().top;
            if (projectTop < triggerBottom) {
                gsap.to(project, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.2
                });
            }
        });
    };

    window.addEventListener('scroll', animateProjects);

    // Form submission animation
    const contactForm = document.querySelector('#contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        gsap.to(contactForm, {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                contactForm.reset();
                gsap.to(contactForm, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3
                });
            }
        });
    });

    // Particle background effect
    const createParticle = (x, y) => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);

        gsap.set(particle, {
            x: x,
            y: y,
            scale: 0,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
        });

        gsap.to(particle, {
            duration: Math.random() * 2 + 1,
            x: x + (Math.random() - 0.5) * 200,
            y: y - 200,
            scale: Math.random() + 0.5,
            opacity: 0,
            onComplete: () => {
                document.body.removeChild(particle);
            }
        });
    };

    document.body.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) {
            createParticle(e.clientX, e.clientY);
        }
    });
});

