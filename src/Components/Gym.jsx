
import React, { useEffect, useState } from "react";

const STORAGE_KEY = "gymAdmissions";

const getStudents = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export default function Gym() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dietTab, setDietTab] = useState("loss");
  const [notification, setNotification] = useState("");
  const [selectedDetails, setSelectedDetails] = useState(null);

  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const [admissions, setAdmissions] = useState(getStudents);
  const [editingStudent, setEditingStudent] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3500);
  };

  const saveStudents = (students) => {
    setAdmissions(students);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  };

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
      description: "Get guidance from experienced fitness trainers who help you train safely and reach your fitness goals.",
      points: ["Experienced fitness instructors", "Workout technique guidance", "Progress tracking", "Fitness guidance"],
    },
    {
      title: "Personal Training",
      image: "/img/feature-2.jpg",
      icon: "💪",
      description: "Get a training routine designed around your body, fitness level and personal goals.",
      points: ["Individual workout plans", "One-to-one trainer attention", "Goal-based exercises", "Progress assessment"],
    },
    {
      title: "Flexible Classes",
      image: "/img/feature-3.jpg",
      icon: "⏰",
      description: "Choose a workout routine that fits your daily schedule and lifestyle.",
      points: ["Morning and evening sessions", "Beginner-friendly classes", "Strength and cardio", "Flexible routines"],
    },
    {
      title: "Quality Equipment",
      image: "/img/feature-4.jpg",
      icon: "⚙️",
      description: "Train with quality gym equipment designed to support strength, cardio and overall fitness.",
      points: ["Modern strength machines", "Dumbbells and free weights", "Cardio equipment", "Clean workout area"],
    },
  ];

  const courses = [
    {
      title: "Weight Loss",
      image: "/img/feature-1.jpg",
      tag: "FAT BURNING",
      price: "$39",
      description: "Improve fitness, burn calories and work towards a healthier body.",
      exercises: ["Treadmill walking and running", "Cycling and cardio", "HIIT training", "Light strength training"],
    },
    {
      title: "Bodybuilding",
      image: "/img/feature-2.jpg",
      tag: "BUILD YOUR BODY",
      price: "$49",
      description: "Build muscle size and strength through structured weight training.",
      exercises: ["Bench press", "Squats and deadlifts", "Dumbbell workouts", "Progressive overload"],
    },
    {
      title: "Muscle Training",
      image: "/img/feature-3.jpg",
      tag: "STRENGTH TRAINING",
      price: "$59",
      description: "Train different muscle groups to improve strength and body development.",
      exercises: ["Chest and shoulder workouts", "Back and arm exercises", "Leg and abs training", "Cable exercises"],
    },
  ];

  const trainers = [
    { name: "John William", role: "Fitness Trainer", image: "/img/team-1.jpg" },
    { name: "James Peter", role: "Bodybuilding Coach", image: "/img/team-2.jpg" },
    { name: "David Smith", role: "Muscle Trainer", image: "/img/team-3.jpg" },
    { name: "Michael Brown", role: "Fitness Instructor", image: "/img/team-4.jpg" },
  ];

  const posts = [
    { image: "/img/work-1.jpg", title: "Benefits of Daily Exercise", description: "Regular exercise can improve stamina, strength and overall health." },
    { image: "/img/work-2.jpg", title: "Healthy Eating Habits", description: "A balanced diet supports your workout routine and recovery." },
    { image: "/img/work-3.jpg", title: "Build a Stronger Body", description: "Strength training helps develop muscles and improve fitness." },
  ];

  const dietPlans = {
    loss: [
      "Breakfast: Oats, boiled eggs and one fruit",
      "Lunch: Grilled chicken, vegetables and rice",
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

    const data = new FormData(e.target);

    const student = {
      id: Date.now(),
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      age: data.get("age"),
      gender: data.get("gender"),
      goal: data.get("goal"),
      course: data.get("course"),
      message: data.get("message"),
      date: new Date().toLocaleDateString(),
      paid: false,
      fee: 1000,
      paymentMonth: null,
      paymentYear: null,
    };

    saveStudents([...admissions, student]);
    showNotification("Admission submitted successfully!");
    e.target.reset();
  };

  const handleAdminAddStudent = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const student = {
      id: Date.now(),
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      age: data.get("age"),
      gender: data.get("gender"),
      goal: data.get("goal"),
      course: data.get("course"),
      message: "Added by Admin",
      date: new Date().toLocaleDateString(),
      paid: false,
      fee: 1000,
      paymentMonth: null,
      paymentYear: null,
    };

    saveStudents([...admissions, student]);
    showNotification("New student added successfully!");
    e.target.reset();
  };

  const adminLogin = (e) => {
    e.preventDefault();

    if (adminUser === "admin" && adminPass === "12345") {
      setAdminLoggedIn(true);
      setAdminLoginOpen(false);
      setAdminUser("");
      setAdminPass("");
      setAdmissions(getStudents());
      showNotification("Welcome to Admin Dashboard!");
    } else {
      showNotification("Wrong username or password!");
    }
  };

  const toggleStudentPaid = (id) => {
    const updated = admissions.map((student) => {
      if (student.id !== id) return student;

      const paid = !student.paid;

      return {
        ...student,
        paid,
        paymentMonth: paid ? new Date().getMonth() : null,
        paymentYear: paid ? new Date().getFullYear() : null,
      };
    });

    saveStudents(updated);
    showNotification("Student payment status updated!");
  };

  const deleteStudent = (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    saveStudents(admissions.filter((student) => student.id !== id));
    showNotification("Student deleted successfully!");
  };

  const startEditStudent = (student) => {
    setEditingStudent(student);
  };

  const saveEditedStudent = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const updated = admissions.map((student) =>
      student.id === editingStudent.id
        ? {
            ...student,
            name: data.get("name"),
            phone: data.get("phone"),
            email: data.get("email"),
            course: data.get("course"),
          }
        : student
    );

    saveStudents(updated);
    setEditingStudent(null);
    showNotification("Student details updated!");
  };

  const openDetails = (item) => {
    setSelectedDetails(item);
  };

  const paidCount = admissions.filter((student) => student.paid).length;
  const unpaidCount = admissions.length - paidCount;
  const totalPaid = admissions
    .filter((student) => student.paid)
    .reduce((sum, student) => sum + Number(student.fee || 1000), 0);

  const monthlyBars = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));

    const amount = admissions
      .filter(
        (student) =>
          student.paid &&
          student.paymentMonth === date.getMonth() &&
          student.paymentYear === date.getFullYear()
      )
      .reduce((sum, student) => sum + Number(student.fee || 1000), 0);

    return {
      label: date.toLocaleString("en", { month: "short" }),
      amount,
    };
  });

  const maxMonthly = Math.max(1000, ...monthlyBars.map((item) => item.amount));

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
            aria-label="Toggle navigation"
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
              <a href={link} key={label} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}

            <button
              className="nav-dashboard-btn"
              onClick={() => {
                setMenuOpen(false);
                setAdminLoginOpen(true);
              }}
            >
              Dashboard
            </button>
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
              <a href="#admission" className="btn btn-outline">Join Now</a>
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
          <p>Set your goal, follow your routine and keep moving forward.</p>
          <a href="#admission" className="btn">Start Training</a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section section-padding" id="features">
        <div className="container">
          <div className="section-heading reveal">
            <span className="section-label">WHY CHOOSE US</span>
            <h2>Our Fitness Features</h2>
            <p>Everything you need to make your fitness journey better.</p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <article className="feature-card reveal" key={feature.title}>
                <div className="feature-image">
                  <img src={feature.image} alt={feature.title} />
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <button className="details-btn" onClick={() => openDetails(feature)}>
                    View Details
                  </button>
                </div>
              </article>
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
            <p>Select a training program according to your fitness goals.</p>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <article className="course-card reveal" key={course.title}>
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  <span className="course-price">{course.price}</span>
                </div>
                <div className="course-content">
                  <span className="course-tag">{course.tag}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button className="details-btn" onClick={() => openDetails(course)}>
                    View Details
                  </button>
                  <a href="#admission" className="btn course-btn">Join This Course</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN BANNER */}
      <section className="join-banner">
        <div className="container join-content reveal">
          <h2>READY TO CHANGE YOUR LIFE?</h2>
          <p>Your fitness journey starts with one decision. Join us today.</p>
          <a href="#admission" className="btn">Join Our Gym</a>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="trainers-section section-padding" id="trainers">
        <div className="container">
          <div className="section-heading reveal">
            <span className="section-label">OUR TEAM</span>
            <h2>Meet Our Expert Trainers</h2>
            <p>Get motivation and guidance from our fitness team.</p>
          </div>

          <div className="trainers-grid">
            {trainers.map((trainer) => (
              <article className="trainer-card reveal" key={trainer.name}>
                <img src={trainer.image} alt={trainer.name} />
                <div className="trainer-info">
                  <h3>{trainer.name}</h3>
                  <p>{trainer.role}</p>
                  <button
                    className="details-btn"
                    onClick={() =>
                      openDetails({
                        title: trainer.name,
                        description: `${trainer.name} works as a ${trainer.role} at Jass Fitness.`,
                        image: trainer.image,
                        points: [trainer.role, "Personal fitness guidance", "Training support"],
                      })
                    }
                  >
                    View Details
                  </button>
                </div>
              </article>
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
            <p>Nutrition is an important part of your fitness journey.</p>
          </div>

          <div className="diet-tabs">
            <button className={dietTab === "loss" ? "active" : ""} onClick={() => setDietTab("loss")}>
              Weight Loss
            </button>
            <button className={dietTab === "gain" ? "active" : ""} onClick={() => setDietTab("gain")}>
              Weight Gain
            </button>
          </div>

          <div className="diet-card reveal">
            <div className="diet-image">
              <img
                src={dietTab === "loss" ? "/img/work-1.jpg" : "/img/work-2.jpg"}
                alt="Diet plan"
              />
            </div>
            <div className="diet-content">
              <h3>{dietTab === "loss" ? "Weight Loss Diet" : "Weight Gain Diet"}</h3>
              <p>
                {dietTab === "loss"
                  ? "A balanced meal plan can support your fat-loss and fitness goals."
                  : "A balanced meal plan can support muscle growth and healthy weight gain."}
              </p>
              <ul>
                {dietPlans[dietTab].map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
              <p className="diet-note">Food needs vary from person to person. Adjust portions according to your needs.</p>
              <button
                className="details-btn"
                onClick={() =>
                  openDetails({
                    title: dietTab === "loss" ? "Weight Loss Diet" : "Weight Gain Diet",
                    description: "A balanced diet plan to support your fitness journey.",
                    image: dietTab === "loss" ? "/img/work-1.jpg" : "/img/work-2.jpg",
                    points: dietPlans[dietTab],
                  })
                }
              >
                View Details
              </button>
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
            "Consistency, proper guidance and a positive environment make
            every workout count. Keep working towards your goals!"
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
              <article className="blog-card reveal" key={post.title}>
                <img src={post.image} alt={post.title} />
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <button className="details-btn" onClick={() => openDetails(post)}>
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION */}
      <section className="admission-section section-padding" id="admission">
        <div className="container admission-container">
          <div className="admission-info reveal">
            <span className="section-label">JOIN OUR GYM</span>
            <h2>Start Your Fitness Journey Today</h2>
            <p>Fill out the admission form and choose your fitness program.</p>
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
              <input name="name" placeholder="Full Name" required />
              <input name="phone" type="tel" placeholder="Phone Number" required />
            </div>

            <div className="form-row">
              <input name="email" type="email" placeholder="Email Address" required />
              <input name="age" type="number" placeholder="Your Age" min="12" required />
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

            <textarea name="message" placeholder="Your Message (Optional)" rows="4" />

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
            <a href="#home" className="logo">JASS <span>FITNESS</span></a>
            <p>Train with passion. Stay consistent. Build a stronger you.</p>
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
          <button className="admin-open-link" onClick={() => setAdminLoginOpen(true)}>
            Admin Login
          </button>
        </div>
      </footer>

      {/* DETAILS POPUP */}
      {selectedDetails && (
        <div className="gym-modal-backdrop" onClick={() => setSelectedDetails(null)}>
          <div className="gym-details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDetails(null)}>×</button>
            {selectedDetails.image && <img src={selectedDetails.image} alt={selectedDetails.title} />}
            <div className="modal-details-content">
              <span className="section-label">JASS FITNESS</span>
              <h2>{selectedDetails.title}</h2>
              <p>{selectedDetails.description}</p>
              {selectedDetails.points?.length > 0 && (
                <ul>{selectedDetails.points.map((point) => <li key={point}>✓ {point}</li>)}</ul>
              )}
              <a href="#admission" className="btn" onClick={() => setSelectedDetails(null)}>Join Now</a>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN LOGIN */}
      {adminLoginOpen && !adminLoggedIn && (
        <div className="gym-modal-backdrop" onClick={() => setAdminLoginOpen(false)}>
          <div className="admin-login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setAdminLoginOpen(false)}>×</button>

            <div className="admin-login-content">
              <span className="section-label">PRIVATE AREA</span>
              <h2>Admin <span>Login</span></h2>
              <p>Welcome back! Access your gym dashboard.</p>

              <form onSubmit={adminLogin}>
                <input
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  placeholder="Username"
                  required
                />
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button className="btn" type="submit">LOGIN TO DASHBOARD →</button>
              </form>

              <small>JASS FITNESS • ADMIN ACCESS</small>
            </div>

            <div className="admin-login-art">
              <div className="login-dumbbell">🏋️</div>
              <h2>NO PAIN<br />NO GAIN</h2>
              <p>TRAIN HARD • STAY STRONG</p>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD */}
      {adminLoggedIn && (
        <div className="admin-dashboard-wrap">
          <div className="admin-dashboard">
            <div className="admin-dashboard-head">
              <div>
                <span className="section-label">JASS FITNESS MANAGEMENT</span>
                <h2>Admin Dashboard</h2>
              </div>
              <button className="btn" onClick={() => setAdminLoggedIn(false)}>
                Close Dashboard
              </button>
            </div>

            <div className="admin-stats-grid">
              <div className="admin-stat"><span>Total Students</span><strong>{admissions.length}</strong></div>
              <div className="admin-stat"><span>Paid Students</span><strong>{paidCount}</strong></div>
              <div className="admin-stat"><span>Unpaid Students</span><strong>{unpaidCount}</strong></div>
              <div className="admin-stat"><span>Total Fee Received</span><strong>Rs. {totalPaid.toLocaleString()}</strong></div>
            </div>

            {/* ADD STUDENT */}
            <section className="admin-panel">
              <h3>➕ Add New Student</h3>
              <form onSubmit={handleAdminAddStudent}>
                <div className="admin-add-grid">
                  <input name="name" placeholder="Student Full Name" required />
                  <input name="phone" placeholder="Phone Number" required />
                  <input name="email" type="email" placeholder="Email Address" />
                  <input name="age" type="number" placeholder="Age" />
                  <select name="gender" defaultValue="">
                    <option value="" disabled>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <select name="goal" defaultValue="">
                    <option value="" disabled>Fitness Goal</option>
                    <option>Weight Loss</option>
                    <option>Weight Gain</option>
                    <option>Muscle Building</option>
                    <option>General Fitness</option>
                  </select>
                  <select name="course" defaultValue="" required>
                    <option value="" disabled>Select Course</option>
                    <option>Weight Loss</option>
                    <option>Bodybuilding</option>
                    <option>Muscle Training</option>
                    <option>Personal Training</option>
                  </select>
                </div>
                <button type="submit" className="btn">+ Add Student</button>
              </form>
            </section>

            {/* MONTHLY INCOME */}
            <section className="admin-panel">
              <h3>Monthly Income (Rs. 1,000 per student)</h3>
              <div className="admin-chart">
                {monthlyBars.map((bar) => (
                  <div className="admin-chart-column" key={bar.label}>
                    <div className="admin-bar-track">
                      <div className="admin-bar" style={{ height: `${(bar.amount / maxMonthly) * 100}%` }} />
                    </div>
                    <b>Rs. {bar.amount.toLocaleString()}</b>
                    <span>{bar.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* STUDENT RECORDS */}
            <section className="admin-panel">
              <h3>Student Records</h3>

              {admissions.length === 0 ? (
                <p className="admin-empty">Abhi koi admission record nahi hai.</p>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-student-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Fee</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissions.map((student) => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.phone}</td>
                          <td>{student.course}</td>
                          <td>{student.date}</td>
                          <td>Rs. {student.fee || 1000}</td>
                          <td>
                            <span className={student.paid ? "paid-label" : "unpaid-label"}>
                              {student.paid ? "PAID" : "UNPAID"}
                            </span>
                          </td>
                          <td className="admin-actions">
                            <button onClick={() => toggleStudentPaid(student.id)}>
                              {student.paid ? "Mark Unpaid" : "Mark Paid"}
                            </button>
                            <button onClick={() => startEditStudent(student)}>Edit</button>
                            <button className="delete-btn" onClick={() => deleteStudent(student.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <p className="admin-note">
              Note: This is a frontend-only dashboard. Records are saved in this browser only.
              A backend/database is needed to securely share admissions across devices.
            </p>
          </div>
        </div>
      )}

      {/* EDIT STUDENT */}
      {editingStudent && (
        <div className="gym-modal-backdrop" onClick={() => setEditingStudent(null)}>
          <form className="student-edit-modal" onSubmit={saveEditedStudent} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setEditingStudent(null)}>×</button>
            <h2>Edit Student</h2>
            <input name="name" defaultValue={editingStudent.name} required />
            <input name="phone" defaultValue={editingStudent.phone} required />
            <input name="email" defaultValue={editingStudent.email} />
            <select name="course" defaultValue={editingStudent.course}>
              <option>Weight Loss</option>
              <option>Bodybuilding</option>
              <option>Muscle Training</option>
              <option>Personal Training</option>
            </select>
            <button className="btn" type="submit">Save Changes</button>
          </form>
        </div>
      )}

      {/* NOTIFICATION */}
      {notification && <div className="notification">✓ {notification}</div>}

    </div>
  );
}
