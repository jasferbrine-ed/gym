
import React, { useEffect, useState } from "react";


export default function Gym() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dietTab, setDietTab] = useState("loss");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Expert Trainers",
      image: "/img/feature-1.jpg",
      icon: "🏋️",
      description:
        "Get guidance from experienced fitness trainers who help you train safely and reach your fitness goals.",
      points: [
        "Experienced fitness instructors",
        "Workout technique guidance",
        "Progress tracking and motivation",
        "Fitness and nutrition guidance",
      ],
    },
    {
      title: "Personal Training",
      image: "/img/feature-2.jpg",
      icon: "💪",
      description:
        "Get a training routine designed around your body, fitness level and personal goals.",
      points: [
        "Individual workout plans",
        "One-to-one trainer attention",
        "Goal-based exercises",
        "Regular progress assessment",
      ],
    },
    {
      title: "Flexible Classes",
      image: "/img/feature-3.jpg",
      icon: "⏰",
      description:
        "Choose a workout routine that fits your daily schedule and lifestyle.",
      points: [
        "Morning and evening sessions",
        "Beginner-friendly classes",
        "Strength and cardio sessions",
        "Flexible workout routines",
      ],
    },
    {
      title: "Quality Equipment",
      image: "/img/feature-4.jpg",
      icon: "⚙️",
      description:
        "Train with quality gym equipment designed to support strength, cardio and overall fitness.",
      points: [
        "Modern strength machines",
        "Dumbbells and free weights",
        "Cardio and treadmill equipment",
        "Clean and organized workout area",
      ],
    },
  ];

  const courses = [
    {
      title: "Weight Loss",
      image: "/img/feature-1.jpg",
      tag: "FAT BURNING",
      price: "$39",
      description:
        "Improve fitness, burn calories and work towards a healthier body with a balanced exercise routine.",
      exercises: [
        "Treadmill walking and running",
        "Cycling and cardio workouts",
        "HIIT and circuit training",
        "Light strength training",
      ],
      focus: "Fat loss, stamina and fitness",
    },
    {
      title: "Bodybuilding",
      image: "/img/feature-2.jpg",
      tag: "BUILD YOUR BODY",
      price: "$49",
      description:
        "Build muscle size and strength through structured weight training and progressive workouts.",
      exercises: [
        "Bench press and chest exercises",
        "Squats and deadlifts",
        "Dumbbell and barbell workouts",
        "Progressive overload training",
      ],
      focus: "Muscle growth and strength",
    },
    {
      title: "Muscle Training",
      image: "/img/feature-3.jpg",
      tag: "STRENGTH TRAINING",
      price: "$59",
      description:
        "Train different muscle groups to improve strength, balance and overall body development.",
      exercises: [
        "Chest and shoulder workouts",
        "Back and arm exercises",
        "Leg and abs training",
        "Cable and dumbbell exercises",
      ],
      focus: "Muscle strength and development",
    },
  ];

  const trainers = [
    {
      name: "John William",
      role: "Fitness Trainer",
      image: "/img/team-1.jpg",
    },
    {
      name: "James Peter",
      role: "Bodybuilding Coach",
      image: "/img/team-2.jpg",
    },
    {
      name: "David Smith",
      role: "Muscle Trainer",
      image: "/img/team-3.jpg",
    },
    {
      name: "Michael Brown",
      role: "Fitness Instructor",
      image: "/img/team-4.jpg",
    },
  ];

  const posts = [
    {
      image: "/img/work-1.jpg",
      title: "Benefits of Daily Exercise",
      description:
        "Regular exercise can improve stamina, strength and overall health.",
    },
    {
      image: "/img/work-2.jpg",
      title: "Healthy Eating Habits",
      description:
        "A balanced diet supports your workout routine and recovery.",
    },
    {
      image: "/img/work-3.jpg",
      title: "Build a Stronger Body",
      description:
        "Strength training helps develop muscles and improve fitness.",
    },
  ];

  const dietPlans = {
    loss: [
      "Breakfast: Oats, boiled eggs and one fruit",
      "Lunch: Grilled chicken, vegetables and a small portion of rice",
      "Snack: Apple or yogurt",
      "Dinner: Grilled fish or chicken with salad",
    ],
    gain: [
      "Breakfast: Eggs, milk, oats and banana",
      "Lunch: Chicken, rice and vegetables",
      "Snack: Peanut butter sandwich and milk",
      "Dinner: Rice, meat and vegetables",
    ],
  };

  const handleAdmission = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const admission = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      goal: formData.get("goal"),
      course: formData.get("course"),
      message: formData.get("message"),
      date: new Date().toLocaleString(),
    };

    const previous = JSON.parse(
      localStorage.getItem("gymAdmissions") || "[]"
    );

    previous.push(admission);

    localStorage.setItem("gymAdmissions", JSON.stringify(previous));

    setNotification("Your admission form has been submitted successfully!");
    e.target.reset();

    setTimeout(() => setNotification(""), 4000);
  };

  return (
    <div className="gym-website">

      {/* TOP BAR */}
      <div className="topbar">
        <div className="container topbar-content">
          <p>📍 Your Fitness Destination</p>
          <p>📞 +92 300 1234567</p>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container nav-content">
          <a href="#home" className="logo">
            JASS <span>FITNESS</span>
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className={`nav-links ${menuOpen ? "show" : ""}`}>
            {[
              ["Home", "#home"],
              ["About", "#about"],
              ["Features", "#features"],
              ["Courses", "#courses"],
              ["Trainers", "#trainers"],
              ["Diet Plan", "#diet"],
              ["Admission", "#admission"],
            ].map(([label, link]) => (
              <a
                href={link}
                key={label}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-overlay">
          <div className="container hero-content reveal">
            <span className="hero-small">WELCOME TO JASS FITNESS</span>
            <h1>
              BUILD YOUR <span>BODY</span>
              <br />
              TRANSFORM YOUR LIFE
            </h1>
            <p>
              Train harder, stay stronger and achieve your fitness goals
              with the right guidance and motivation.
            </p>
            <div className="hero-buttons">
              <a href="#courses" className="btn">Explore Courses</a>
              <a href="#admission" className="btn btn-outline">
                Join Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about section-padding" id="about">
        <div className="container about-grid">
          <div className="about-image reveal">
            <img src="/img/about-2.png" alt="Gym workout" />
          </div>

          <div className="about-content reveal">
            <span className="section-label">ABOUT OUR GYM</span>
            <h2>Welcome To Our Fitness Center</h2>
            <p>
              Our gym is a place where you can improve your strength,
              fitness and confidence. We provide a supportive environment
              for beginners and experienced fitness lovers.
            </p>
            <p>
              With expert guidance, quality equipment and different
              training programs, we help you work towards your goals.
            </p>
            <a href="#features" className="btn">Discover More</a>
          </div>
        </div>
      </section>

      {/* GOALS */}
      <section className="goals-banner">
        <div className="container goals-content reveal">
          <span className="section-label">YOUR FITNESS JOURNEY</span>
          <h2>MAKE YOUR BODY STRONGER</h2>
          <p>
            Set your goal, follow your routine and keep moving forward.
            Every workout brings you one step closer.
          </p>
          <a href="#admission" className="btn">Start Training</a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section section-padding" id="features">
        <div className="container">
          <div className="section-heading reveal">
            <span className="section-label">WHY CHOOSE US</span>
            <h2>Our Fitness Features</h2>
            <p>
              Everything you need to make your fitness journey better.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card reveal" key={feature.title}>
                <div className="feature-image">
                  <img src={feature.image} alt={feature.title} />
                  <span className="feature-icon">{feature.icon}</span>
                </div>

                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>

                  <ul>
                    {feature.points.map((point) => (
                      <li key={point}>✓ {point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="courses-section section-padding" id="courses">
        <div className="container">
          <div className="section-heading reveal">
            <span className="section-label">OUR COURSES</span>
            <h2>Choose Your Fitness Program</h2>
            <p>
              Select a training program according to your fitness goals.
            </p>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <div className="course-card reveal" key={course.title}>
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                </div>

                <div className="course-content">
                  <span className="course-tag">{course.tag}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>

                  <h4>Recommended Workouts</h4>
                  <ul>
                    {course.exercises.map((exercise) => (
                      <li key={exercise}>✓ {exercise}</li>
                    ))}
                  </ul>

                  <div className="course-focus">
                    <strong>Training Focus:</strong> {course.focus}
                  </div>

                  <a href="#admission" className="btn course-btn">
                    Join This Course
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN BANNER */}
      <section className="join-banner">
        <div className="container join-content reveal">
          <h2>READY TO CHANGE YOUR LIFE?</h2>
          <p>
            Your fitness journey starts with one decision. Join us today.
          </p>
          <a href="#admission" className="btn">Join Our Gym</a>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="trainers-section section-padding" id="trainers">
        <div className="container">
          <div className="section-heading reveal">
            <span className="section-label">OUR TEAM</span>
            <h2>Meet Our Expert Trainers</h2>
            <p>
              Get motivation and guidance from our fitness team.
            </p>
          </div>

          <div className="trainers-grid">
            {trainers.map((trainer) => (
              <div className="trainer-card reveal" key={trainer.name}>
                <img src={trainer.image} alt={trainer.name} />
                <div className="trainer-info">
                  <h3>{trainer.name}</h3>
                  <p>{trainer.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIET PLAN */}
      <section className="diet-section section-padding" id="diet">
        <div className="container">
          <div className="section-heading reveal">
            <span className="section-label">HEALTHY LIFESTYLE</span>
            <h2>Weight Loss & Weight Gain Diet Plans</h2>
            <p>
              Nutrition is an important part of your fitness journey.
            </p>
          </div>

          <div className="diet-tabs">
            <button
              className={dietTab === "loss" ? "active" : ""}
              onClick={() => setDietTab("loss")}
            >
              Weight Loss
            </button>

            <button
              className={dietTab === "gain" ? "active" : ""}
              onClick={() => setDietTab("gain")}
            >
              Weight Gain
            </button>
          </div>

          <div className="diet-card reveal">
            <div className="diet-image">
              <img
                src={
                  dietTab === "loss"
                    ? "/img/work-1.jpg"
                    : "/img/work-2.jpg"
                }
                alt={dietTab === "loss" ? "Weight Loss" : "Weight Gain"}
              />
            </div>

            <div className="diet-content">
              <h3>
                {dietTab === "loss"
                  ? "Weight Loss Diet"
                  : "Weight Gain Diet"}
              </h3>

              <p>
                {dietTab === "loss"
                  ? "A balanced meal plan with suitable portions can support your fat-loss and fitness goals."
                  : "A balanced calorie-rich meal plan with enough protein can support muscle growth and healthy weight gain."}
              </p>

              <ul>
                {dietPlans[dietTab].map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>

              <p className="diet-note">
                Note: Food needs vary from person to person. Adjust portions
                according to your needs and professional advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial-section">
        <div className="container testimonial-content reveal">
          <span className="section-label">MEMBER EXPERIENCE</span>
          <h2>Stronger Every Day</h2>
          <p>
            "Consistency, proper guidance and a positive environment
            make every workout count. Keep working towards your goals!"
          </p>
          <h4>JASS FITNESS</h4>
        </div>
      </section>

      {/* BLOG */}
      <section className="blog-section section-padding" id="blog">
        <div className="container">
          <div className="section-heading reveal">
            <span className="section-label">FITNESS BLOG</span>
            <h2>Latest Fitness Tips</h2>
            <p>Learn more about exercise, health and training.</p>
          </div>

          <div className="blog-grid">
            {posts.map((post) => (
              <div className="blog-card reveal" key={post.title}>
                <img src={post.image} alt={post.title} />
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION FORM */}
      <section className="admission-section section-padding" id="admission">
        <div className="container admission-container">
          <div className="admission-info reveal">
            <span className="section-label">JOIN OUR GYM</span>
            <h2>Start Your Fitness Journey Today</h2>
            <p>
              Fill out the admission form and choose the fitness program
              you want to follow.
            </p>
            <div className="admission-benefit">
              <p>✓ Expert fitness guidance</p>
              <p>✓ Different training programs</p>
              <p>✓ Supportive workout environment</p>
              <p>✓ Fitness-focused community</p>
            </div>
          </div>

          <form className="admission-form reveal" onSubmit={handleAdmission}>
            <h3>Admission Form</h3>

            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Your Age"
                min="12"
                required
              />
            </div>

            <div className="form-row">
              <select name="gender" required defaultValue="">
                <option value="" disabled>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <select name="goal" required defaultValue="">
                <option value="" disabled>Fitness Goal</option>
                <option>Weight Loss</option>
                <option>Weight Gain</option>
                <option>Muscle Building</option>
                <option>General Fitness</option>
              </select>
            </div>

            <select name="course" required defaultValue="">
              <option value="" disabled>Select Course</option>
              <option>Weight Loss</option>
              <option>Bodybuilding</option>
              <option>Muscle Training</option>
              <option>Personal Training</option>
            </select>

            <textarea
              name="message"
              placeholder="Your Message (Optional)"
              rows="4"
            />

            <button type="submit" className="btn form-submit">
              Submit Admission
            </button>
          </form>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="container newsletter-content">
          <h2>STAY FIT. STAY STRONG.</h2>
          <p>Make fitness a part of your everyday life.</p>
          <a href="#admission" className="btn">Join Now</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-content">
          <div>
            <a href="#home" className="logo">
              JASS <span>FITNESS</span>
            </a>
            <p>
              Train with passion. Stay consistent. Build a stronger you.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#courses">Courses</a>
            <a href="#admission">Admission</a>
          </div>

          <div className="footer-links">
            <h3>Our Courses</h3>
            <a href="#courses">Weight Loss</a>
            <a href="#courses">Bodybuilding</a>
            <a href="#courses">Muscle Training</a>
            <a href="#trainers">Expert Trainers</a>
          </div>

          <div className="footer-links">
            <h3>Contact</h3>
            <p>📍 Your Gym Address</p>
            <p>📞 +92 300 1234567</p>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} JASS FITNESS. All Rights Reserved.
        </div>
      </footer>

      {/* NOTIFICATION */}
      {notification && (
        <div className="notification">
          ✓ {notification}
        </div>
      )}

    </div>
  );
}
