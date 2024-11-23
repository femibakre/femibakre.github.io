import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const Portfolio = () => {
    useEffect(() => {
        // Update current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();

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

        // Project tabs functionality
        const projectTabs = document.querySelectorAll('.project-tab');
        const projectContents = document.querySelectorAll('.project-content');

        projectTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                projectTabs.forEach(t => t.classList.remove('active'));
                projectContents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });

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

        // Clean up event listeners
        return () => {
            window.removeEventListener('scroll', animateSkills);
            window.removeEventListener('scroll', animateProjects);
        };
    }, []);

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="home" className="hero">
                    <h1>Jane Doe</h1>
                    <h2>Data Scientist & Analyst</h2>
                    <p>Turning data into actionable insights</p>
                </section>

                <section id="skills">
                    <h2>Skills</h2>
                    <div className="skills-grid">
                        <div className="skill">Python</div>
                        <div className="skill">R</div>
                        <div className="skill">SQL</div>
                        <div className="skill">Machine Learning</div>
                        <div className="skill">Data Visualization</div>
                        <div className="skill">Statistical Analysis</div>
                    </div>
                </section>

                <section id="projects">
                    <h2>Projects</h2>
                    <div className="projects-grid">
                        <div className="project">
                            <h3>Customer Segmentation</h3>
                            <p>Used K-means clustering to segment customers based on their purchasing behavior.</p>
                        </div>
                        <div className="project">
                            <h3>Sales Prediction</h3>
                            <p>Developed a time series model to forecast monthly sales for a retail company.</p>
                        </div>
                        <div className="project">
                            <h3>Sentiment Analysis</h3>
                            <p>Built a natural language processing model to analyze customer reviews.</p>
                        </div>
                    </div>
                </section>

                <section id="contact">
                    <h2>Contact Me</h2>
                    <form id="contact-form">
                        <input type="text" name="name" placeholder="Your Name" required />
                        <input type="email" name="email" placeholder="Your Email" required />
                        <textarea name="message" placeholder="Your Message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </section>
            </main>

            <footer>
                <p>&copy; <span id="current-year"></span> Jane Doe. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Portfolio;

