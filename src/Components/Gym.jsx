
import React, { useEffect, useState } from "react";


const courses = [
  { title: "Body Building", img: "/img/feature-1.jpg", price: "$49" },
  { title: "Weight Loss", img: "/img/feature-2.jpg", price: "$39" },
  { title: "Muscle Training", img: "/img/feature-3.jpg", price: "$59" },
];

const trainers = [
  { name: "John Deo", role: "Fitness Trainer", img: "/img/team-1.jpg" },
  { name: "Jessica Brown", role: "Yoga Trainer", img: "/img/team-2.jpg" },
  { name: "David Martin", role: "Body Building", img: "/img/team-3.jpg" },
  { name: "Sarah Albert", role: "Fitness Trainer", img: "/img/team-4.jpg" },
];

const posts = [
  { title: "Build a healthy body with regular exercise", img: "/img/work-1.jpg" },
  { title: "Simple tips to improve your fitness", img: "/img/work-2.jpg" },
  { title: "How to stay motivated at the gym", img: "/img/work-3.jpg" },
];

export default function Gym() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 70) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    const timer = setInterval(() => {
      setSlide((current) => (current + 1) % 2);
    }, 6000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(timer);
    };
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="gym-site">
      {/* TOP BAR */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div>✉ jasferbrine@gmail.com</div>
          <div>◷ Mon - Sat: 8:00 am - 7:00 pm</div>
          <div className="top-social">Follow us: <a href="#footer">f</a> <a href="#footer">𝕏</a> <a href="#footer">◎</a></div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="gym-header">
        <div className="container nav-inner">
          <a className="logo" href="#home" onClick={() => setMenuOpen(false)}>
            <span className="logo-icon">✊</span> JASS PAIN ZONE<span className="logo-dot">.</span>
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#courses" onClick={() => setMenuOpen(false)}>Courses</a>
            <a href="#trainers" onClick={() => setMenuOpen(false)}>Trainers</a>
            <a href="#blog" onClick={() => setMenuOpen(false)}>Blog</a>
            <a href="#footer" className="nav-cta" onClick={() => setMenuOpen(false)}>Contact Us ↗</a>
          </nav>
        </div>
      </header>

      {/* HERO SLIDER */}
      <section className={`hero hero-slide-${slide}`} id="home">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy" key={slide}>
            <p className="eyebrow">WELCOME TO THE PAIN ZONE</p>
            <h1>
              {slide === 0
                ? <>The Best Gym Center Is <span>Now In Your City</span></>
                : <>Stay Healthy By Exercising At The <span>Best Gym Center</span></>}
            </h1>
            <p className="hero-description">
              Build strength, improve your fitness and achieve your goals
              with professional trainers and a supportive community.
            </p>
            <div className="hero-actions">
              <a href="#about" className="btn btn-dark">Discover More ↗</a>
              <a href="#courses" className="btn btn-primary">Explore Courses ↗</a>
            </div>
          </div>
          <div className="hero-dots">
            {[0, 1].map((n) => (
              <button
                key={n}
                className={slide === n ? "hero-dot active" : "hero-dot"}
                onClick={() => setSlide(n)}
                aria-label={`Show slide ${n + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-visual reveal">
            <img className="about-main-img" src="/img/about-2.png" alt="Fitness training" />
            <div className="experience-card">
              <strong>10+</strong>
              <span>Years of Experience</span>
            </div>
          </div>

          <div className="about-copy reveal">
            <p className="eyebrow">ABOUT OUR GYM</p>
            <h2>We Help You Build Your <span>Dream Body</span></h2>
            <p>
              Welcome to our fitness center. We help people of all fitness
              levels get stronger, feel healthier and build lasting habits.
              Our trainers make your fitness journey focused and enjoyable.
            </p>
            <div className="about-points">
              <div><span>✓</span><div><strong>Certified Trainers</strong><p>Expert guidance for your goals.</p></div></div>
              <div><span>✓</span><div><strong>Modern Equipment</strong><p>Train with quality gym equipment.</p></div></div>
              <div><span>✓</span><div><strong>Personalized Plans</strong><p>Training that fits your needs.</p></div></div>
              <div><span>✓</span><div><strong>Friendly Community</strong><p>Stay motivated every day.</p></div></div>
            </div>
            <a className="btn btn-primary" href="#features">Learn More ↗</a>
          </div>
        </div>
      </section>

      {/* GOALS BANNER */}
      <section className="goals-section">
        <div className="container goals-content reveal">
          <p className="eyebrow">YOUR FITNESS JOURNEY</p>
          <h2>Make Your Body <span>Healthy & Fit</span></h2>
          <p>Small steps, consistent effort and the right support can help you reach your fitness goals.</p>
          <a href="#courses" className="btn btn-primary">Start Your Journey ↗</a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section" id="features">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">WHY CHOOSE US</p>
            <h2>Build Your Best <span>Version</span></h2>
            <p>Everything you need to make every workout count.</p>
          </div>
          <div className="features-grid">
            {[
              ["01", "Quality Equipment", "Train confidently with modern gym equipment."],
              ["02", "Expert Trainers", "Get support from experienced fitness coaches."],
              ["03", "Personal Training", "Follow a plan designed around your goals."],
              ["04", "Flexible Classes", "Find a routine that fits your schedule."],
            ].map(([number, title, description]) => (
              <article className="feature-card reveal" key={number}>
                <span className="feature-number">{number}</span>
                <div className="feature-icon">✦</div>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href="#courses" aria-label={`Learn about ${title}`}>Learn More ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="section courses-section" id="courses">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">OUR COURSES</p>
            <h2>Choose Your <span>Workout</span></h2>
            <p>Find the training style that works best for you.</p>
          </div>
          <div className="courses-grid">
            {courses.map((course, index) => (
              <article className="course-card reveal" key={course.title}>
                <div className="course-image">
                  <img src={course.img} alt={course.title} />
                  <span className="course-price">{course.price}<small>/ month</small></span>
                </div>
                <div className="course-body">
                  <span className="course-tag">COURSE 0{index + 1}</span>
                  <h3>{course.title}</h3>
                  <p>Improve your strength, energy and fitness with a structured workout plan.</p>
                  <a href="#footer">Explore Course <span>↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="join-section">
        <div className="container join-inner reveal">
          <div>
            <p className="eyebrow">READY TO GET STARTED?</p>
            <h2>Your Goals. Your Effort. <span>Your Results.</span></h2>
            <p>Take the first step towards a stronger and healthier you.</p>
          </div>
          <a href="#footer" className="btn btn-light">Join Our Gym ↗</a>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="section trainers-section" id="trainers">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">MEET OUR TEAM</p>
            <h2>Expert <span>Trainers</span></h2>
            <p>Meet the people who will help you keep moving forward.</p>
          </div>
          <div className="trainers-grid">
            {trainers.map((trainer) => (
              <article className="trainer-card reveal" key={trainer.name}>
                <div className="trainer-image"><img src={trainer.img} alt={trainer.name} /></div>
                <div className="trainer-info">
                  <h3>{trainer.name}</h3>
                  <p>{trainer.role}</p>
                  <div className="trainer-social"><a href="#footer">f</a><a href="#footer">◎</a><a href="#footer">in</a></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial-section">
        <div className="container testimonial-inner reveal">
          <p className="eyebrow">CLIENT STORIES</p>
          <h2>What Our Members <span>Say</span></h2>
          <div className="quote-mark">“</div>
          <p className="testimonial-quote">
            Joining this gym helped me build a consistent routine and feel
            more confident. The trainers are supportive and the atmosphere
            keeps me motivated.
          </p>
          <div className="testimonial-person">
            <img src="/img/testimonial-1.jpg" alt="Gym member" />
            <div><strong>Alex Morgan</strong><span>Gym Member</span></div>
          </div>
          <div className="testimonial-stars">★★★★★</div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section blog-section" id="blog">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">FITNESS JOURNAL</p>
            <h2>Latest News & <span>Articles</span></h2>
            <p>Ideas and advice to help you stay active and informed.</p>
          </div>
          <div className="blog-grid">
            {posts.map((post, index) => (
              <article className="blog-card reveal" key={post.title}>
                <a href="#footer" className="blog-image"><img src={post.img} alt={post.title} /></a>
                <div className="blog-body">
                  <div className="blog-meta">FITNESS TIPS <span>•</span> 0{index + 1} OCT</div>
                  <h3><a href="#footer">{post.title}</a></h3>
                  <p>Discover practical ways to improve your routine and keep moving towards your goals.</p>
                  <a className="read-more" href="#footer">Read Article ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER + FOOTER */}
      <footer className="gym-footer" id="footer">
        <div className="container newsletter reveal">
          <div>
            <p className="eyebrow">STAY IN THE LOOP</p>
            <h2>Get Fitness Tips <span>In Your Inbox</span></h2>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert(email ? `Thanks for subscribing, ${email}!` : "Please enter your email.");
              setEmail("");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">Subscribe ↗</button>
          </form>
        </div>

        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="logo footer-logo" href="#home">✊ Fitness<span className="logo-dot">.</span></a>
            <p>Helping you build strength, improve health and feel your best, one workout at a time.</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <a href="#about">About Us</a><a href="#features">Our Features</a>
            <a href="#courses">Our Courses</a><a href="#trainers">Our Trainers</a>
          </div>
          <div>
            <h3>Our Services</h3>
            <a href="#courses">Body Building</a><a href="#courses">Weight Loss</a>
            <a href="#courses">Muscle Training</a><a href="#courses">Personal Training</a>
          </div>
          <div>
            <h3>Contact Us</h3>
            <p>⌖ Your City, Your Country</p>
            <p>✉ jasferbrine@gmail.com</p>
            <p>☎ +923207080695</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>© {new Date().getFullYear()} Fitness. All rights reserved.</p>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>

      <button className="back-top" aria-label="Back to top" onClick={() => scrollTo("home")}>↑</button>
    </div>
  );
}
