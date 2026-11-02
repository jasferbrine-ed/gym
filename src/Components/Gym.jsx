
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

const dietPlans = {
  loss: {
    title: "Weight Loss Plan",
    description: "Reduce body fat and improve your fitness with balanced meals and regular exercise.",
    meals: [
      ["7:30 AM", "Breakfast", "2 boiled eggs, oats with milk and 1 apple"],
      ["10:30 AM", "Morning Snack", "1 seasonal fruit and a handful of almonds"],
      ["1:30 PM", "Lunch", "Grilled chicken, 1-2 chapatis and fresh salad"],
      ["4:30 PM", "Pre Workout", "1 banana and water"],
      ["6:30 PM", "Post Workout", "Plain yogurt or milk with a protein-rich meal"],
      ["8:00 PM", "Dinner", "Daal or chicken, vegetables and 1 chapati"],
    ],
    workouts: [
      "Monday - Full Body Strength Training",
      "Tuesday - 30 Minutes Brisk Walking",
      "Wednesday - Upper Body Workout",
      "Thursday - Cardio and Core",
      "Friday - Lower Body Workout",
      "Saturday - Light Cardio and Stretching",
      "Sunday - Rest and Recovery",
    ],
    tips: [
      "Maintain a moderate calorie deficit.",
      "Include protein in your main meals.",
      "Drink water regularly.",
      "Limit sugary drinks and frequent fried foods.",
      "Sleep around 7-9 hours.",
    ],
  },
  gain: {
    title: "Weight Gain Plan",
    description: "Build muscle and strength with nutritious food and progressive strength training.",
    meals: [
      ["7:30 AM", "Breakfast", "3 eggs, oats with milk, banana and peanut butter"],
      ["10:30 AM", "Morning Snack", "Dates, almonds and a glass of milk"],
      ["1:30 PM", "Lunch", "Chicken, rice or 2 chapatis, vegetables and yogurt"],
      ["4:30 PM", "Pre Workout", "Banana and peanut butter sandwich"],
      ["6:30 PM", "Post Workout", "Milk, eggs or chicken with rice"],
      ["8:00 PM", "Dinner", "Chicken or daal, rice or chapati and salad"],
    ],
    workouts: [
      "Monday - Chest and Triceps",
      "Tuesday - Back and Biceps",
      "Wednesday - Legs and Core",
      "Thursday - Rest or Light Walking",
      "Friday - Shoulders and Arms",
      "Saturday - Full Body Strength Training",
      "Sunday - Rest and Recovery",
    ],
    tips: [
      "Eat a small calorie surplus.",
      "Include protein in every main meal.",
      "Increase food portions gradually.",
      "Focus on progressive strength training.",
      "Sleep around 7-9 hours.",
    ],
  },
};

export default function Gym() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [activeDiet, setActiveDiet] = useState("loss");

  const [admission, setAdmission] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    goal: "",
    course: "",
    message: "",
  });

  const [notification, setNotification] = useState("");

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

  const updateAdmission = (e) => {
    const { name, value } = e.target;
    setAdmission((prev) => ({ ...prev, [name]: value }));
  };

  const submitAdmission = (e) => {
    e.preventDefault();

    const applicantName = admission.name.trim();

    if (!applicantName || !admission.phone || !admission.goal || !admission.course) {
      setNotification("Please complete all required fields.");
      return;
    }

    setNotification(
      `Congratulations ${applicantName}! Your admission form has been submitted successfully.`
    );

    setAdmission({
      name: "",
      phone: "",
      email: "",
      age: "",
      gender: "",
      goal: "",
      course: "",
      message: "",
    });
  };

  const plan = dietPlans[activeDiet];

  return (
    <div className="gym-site">

      {/* TOP BAR */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div>✉ jasferbrine@gmail.com</div>
          <div>◷ Mon - Sat: 8:00 am - 7:00 pm</div>
          <div className="top-social">
            Follow us: <a href="#footer">f</a>{" "}
            <a href="#footer">𝕏</a>{" "}
            <a href="#footer">◎</a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="gym-header">
        <div className="container nav-inner">
          <a className="logo" href="#home" onClick={() => setMenuOpen(false)}>
            <span className="logo-icon">✊</span> Fitness
            <span className="logo-dot">.</span>
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
            <a href="#weight-plans" onClick={() => setMenuOpen(false)}>Diet Plans</a>
            <a href="#admission" onClick={() => setMenuOpen(false)}>Admission</a>
            <a href="#blog" onClick={() => setMenuOpen(false)}>Blog</a>
            <a href="#footer" className="nav-cta" onClick={() => setMenuOpen(false)}>
              Contact Us ↗
            </a>
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
          <p>
            Small steps, consistent effort and the right support can help you
            reach your fitness goals.
          </p>
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
                  <a href="#admission">Explore Course <span>↗</span></a>
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
          <a href="#admission" className="btn btn-light">Join Our Gym ↗</a>
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
                <div className="trainer-image">
                  <img src={trainer.img} alt={trainer.name} />
                </div>
                <div className="trainer-info">
                  <h3>{trainer.name}</h3>
                  <p>{trainer.role}</p>
                  <div className="trainer-social">
                    <a href="#footer">f</a>
                    <a href="#footer">◎</a>
                    <a href="#footer">in</a>
                  </div>
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

      {/* WEIGHT LOSS AND WEIGHT GAIN */}
      <section className="section weight-section" id="weight-plans">
        <div className="container">

          <div className="section-heading reveal">
            <p className="eyebrow">YOUR FITNESS JOURNEY</p>
            <h2>Weight <span>Loss & Gain</span></h2>
            <p>Choose your goal and follow your daily diet and workout plan.</p>
          </div>

          <div className="weight-tabs">
            <button
              className={activeDiet === "loss" ? "weight-tab active" : "weight-tab"}
              onClick={() => setActiveDiet("loss")}
            >
              🔥 Weight Loss
            </button>
            <button
              className={activeDiet === "gain" ? "weight-tab active" : "weight-tab"}
              onClick={() => setActiveDiet("gain")}
            >
              💪 Weight Gain
            </button>
          </div>

          <div className="weight-intro reveal">
            <span className="weight-badge">
              {activeDiet === "loss" ? "FAT LOSS PROGRAM" : "MUSCLE GAIN PROGRAM"}
            </span>
            <h3>{plan.title}</h3>
            <p>{plan.description}</p>
          </div>

          <div className="weight-grid">

            <div className="weight-panel reveal">
              <h3>🥗 Daily Diet Plan</h3>
              <p className="weight-small">Your daily meal schedule</p>

              {plan.meals.map((meal, index) => (
                <div className="weight-meal" key={index}>
                  <span className="meal-time">{meal[0]}</span>
                  <div>
                    <h4>{meal[1]}</h4>
                    <p>{meal[2]}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="weight-panel reveal">
              <h3>🏋️ Weekly Workout Plan</h3>
              <p className="weight-small">Seven-day training routine</p>

              {plan.workouts.map((workout, index) => (
                <div className="weight-workout" key={index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{workout}</p>
                </div>
              ))}

              <div className="weight-tips">
                <h4>Fitness Tips</h4>
                {plan.tips.map((tip, index) => (
                  <p key={index}>✓ {tip}</p>
                ))}
              </div>
            </div>

          </div>

          <div className="weight-note">
            <strong>Important:</strong> This is a general sample diet plan.
            Food portions and calorie needs depend on age, height, current
            weight, activity and individual health needs. Adjust portions
            with a qualified nutrition professional where needed.
          </div>

          <div className="weight-join">
            <h3>Need a fitness plan?</h3>
            <p>Join our gym and start working towards your goal.</p>
            <a href="#admission" className="btn btn-primary">Join Now ↗</a>
          </div>

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
                <a href="#footer" className="blog-image">
                  <img src={post.img} alt={post.title} />
                </a>
                <div className="blog-body">
                  <div className="blog-meta">
                    FITNESS TIPS <span>•</span> 0{index + 1} OCT
                  </div>
                  <h3><a href="#footer">{post.title}</a></h3>
                  <p>Discover practical ways to improve your routine and keep moving towards your goals.</p>
                  <a className="read-more" href="#footer">Read Article ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION FORM - LAST MAIN SECTION */}
      <section className="section admission-section" id="admission">
        <div className="container">

          <div className="section-heading reveal">
            <p className="eyebrow">BECOME A MEMBER</p>
            <h2>Gym <span>Admission Form</span></h2>
            <p>Fill in your details and take the first step towards your fitness journey.</p>
          </div>

          <div className="admission-wrapper reveal">

            <div className="admission-info">
              <p className="eyebrow">JOIN THE PAIN ZONE</p>
              <h3>Start Your Transformation Today!</h3>
              <p>
                Choose your fitness goal, select a course and send your
                admission request to get started.
              </p>

              <div className="admission-benefit">
                <span>✓</span> Professional trainers
              </div>
              <div className="admission-benefit">
                <span>✓</span> Modern gym equipment
              </div>
              <div className="admission-benefit">
                <span>✓</span> Weight loss and muscle gain guidance
              </div>
              <div className="admission-benefit">
                <span>✓</span> Friendly fitness environment
              </div>
            </div>

            <form className="admission-form" onSubmit={submitAdmission}>
              <h3>Personal Information</h3>

              <div className="admission-fields">
                <div className="admission-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={admission.name}
                    onChange={updateAdmission}
                    required
                  />
                </div>

                <div className="admission-field">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={admission.phone}
                    onChange={updateAdmission}
                    required
                  />
                </div>

                <div className="admission-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={admission.email}
                    onChange={updateAdmission}
                  />
                </div>

                <div className="admission-field">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    min="16"
                    max="100"
                    placeholder="Enter your age"
                    value={admission.age}
                    onChange={updateAdmission}
                  />
                </div>

                <div className="admission-field">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={admission.gender}
                    onChange={updateAdmission}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="admission-field">
                  <label>Fitness Goal *</label>
                  <select
                    name="goal"
                    value={admission.goal}
                    onChange={updateAdmission}
                    required
                  >
                    <option value="">Select Your Goal</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Weight Gain">Weight Gain</option>
                    <option value="Muscle Building">Muscle Building</option>
                    <option value="General Fitness">General Fitness</option>
                  </select>
                </div>

                <div className="admission-field full-field">
                  <label>Select Course *</label>
                  <select
                    name="course"
                    value={admission.course}
                    onChange={updateAdmission}
                    required
                  >
                    <option value="">Choose a Course</option>
                    <option value="Body Building">Body Building</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Training">Muscle Training</option>
                    <option value="Personal Training">Personal Training</option>
                  </select>
                </div>

                <div className="admission-field full-field">
                  <label>Additional Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your fitness goals..."
                    rows="4"
                    value={admission.message}
                    onChange={updateAdmission}
                  />
                </div>
              </div>

              <button className="btn btn-primary admission-submit" type="submit">
                Submit Admission Form ↗
              </button>

              {notification && (
                <div
                  className="admission-notification"
                  role="status"
                  aria-live="polite"
                >
                  {notification}
                  <button
                    type="button"
                    onClick={() => setNotification("")}
                    aria-label="Close notification"
                  >
                    ×
                  </button>
                </div>
              )}
            </form>

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
            <a className="logo footer-logo" href="#home">
              ✊ Fitness<span className="logo-dot">.</span>
            </a>
            <p>
              Helping you build strength, improve health and feel your best,
              one workout at a time.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <a href="#about">About Us</a>
            <a href="#features">Our Features</a>
            <a href="#courses">Our Courses</a>
            <a href="#trainers">Our Trainers</a>
            <a href="#weight-plans">Diet Plans</a>
            <a href="#admission">Admission</a>
          </div>

          <div>
            <h3>Our Services</h3>
            <a href="#courses">Body Building</a>
            <a href="#courses">Weight Loss</a>
            <a href="#courses">Muscle Training</a>
            <a href="#courses">Personal Training</a>
          </div>

          <div>
            <h3>Contact Us</h3>
            <p>⌖ Your City, Your Country</p>
            <p>✉ example@gmail.com</p>
            <p>☎ +00 123 456 789</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>© {new Date().getFullYear()} Fitness. All rights reserved.</p>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>

      <button
        className="back-top"
        aria-label="Back to top"
        onClick={() => scrollTo("home")}
      >
        ↑
      </button>

    </div>
  );
}
