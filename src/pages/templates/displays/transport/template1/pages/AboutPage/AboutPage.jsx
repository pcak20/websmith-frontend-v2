import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Shield,
  Users,
  Clock,
  Star,
  Heart,
  Target,
  Eye,
  Car,
  Globe,
  TrendingUp,
  CheckCircle,
  Quote,
  Calendar,
  MapPin,
  Mail,
  Linkedin,
  Twitter,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./AboutPage.css";

// Company statistics
const companyStats = [
  { number: "500+", label: "Happy Clients", icon: Users },
  { number: "10K+", label: "Completed Rides", icon: Car },
  { number: "15+", label: "Luxury Vehicles", icon: Award },
  { number: "24/7", label: "Customer Support", icon: Clock },
  { number: "99.9%", label: "On-Time Rate", icon: CheckCircle },
  { number: "4.9/5", label: "Customer Rating", icon: Star },
];

// Company values
const companyValues = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for perfection in every aspect of our service, from vehicle maintenance to customer experience.",
    color: "excellence",
  },
  {
    icon: Shield,
    title: "Safety",
    description:
      "Your safety is our top priority. All vehicles undergo rigorous maintenance and safety inspections.",
    color: "safety",
  },
  {
    icon: Heart,
    title: "Luxury",
    description:
      "Experience unparalleled comfort and elegance with our premium fleet and professional service.",
    color: "luxury",
  },
  {
    icon: Users,
    title: "Service",
    description:
      "Our dedicated team is committed to providing personalized, professional service that exceeds expectations.",
    color: "service",
  },
  {
    icon: Clock,
    title: "Reliability",
    description:
      "Count on us to be there when you need us. Punctuality and dependability are cornerstones of our service.",
    color: "reliability",
  },
  {
    icon: Globe,
    title: "Innovation",
    description:
      "We embrace technology and innovation to continuously improve our services and customer experience.",
    color: "innovation",
  },
];

// Team members
const teamMembers = [
  {
    id: 1,
    name: "Michael Harrison",
    position: "Chief Executive Officer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "With over 15 years in luxury transportation, Michael leads our vision of redefining premium travel experiences.",
    linkedin: "#",
    twitter: "#",
    email: "michael@viptransport.com",
  },
  {
    id: 2,
    name: "Sarah Chen",
    position: "Chief Operating Officer",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    bio: "Sarah ensures operational excellence and oversees our fleet management and service quality standards.",
    linkedin: "#",
    twitter: "#",
    email: "sarah@viptransport.com",
  },
  {
    id: 3,
    name: "David Rodriguez",
    position: "Head of Customer Experience",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "David focuses on delivering exceptional customer service and building lasting relationships with our clients.",
    linkedin: "#",
    twitter: "#",
    email: "david@viptransport.com",
  },
  {
    id: 4,
    name: "Emily Johnson",
    position: "Fleet Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Emily manages our luxury fleet, ensuring every vehicle meets our high standards of quality and presentation.",
    linkedin: "#",
    twitter: "#",
    email: "emily@viptransport.com",
  },
  {
    id: 5,
    name: "James Wilson",
    position: "Technology Director",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    bio: "James leads our technology initiatives, developing innovative solutions to enhance our service delivery.",
    linkedin: "#",
    twitter: "#",
    email: "james@viptransport.com",
  },
  {
    id: 6,
    name: "Lisa Thompson",
    position: "Head of Business Development",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    bio: "Lisa drives our growth strategy and manages partnerships with corporate clients and luxury brands.",
    linkedin: "#",
    twitter: "#",
    email: "lisa@viptransport.com",
  },
];

// Company milestones
const milestones = [
  {
    year: "2018",
    title: "Company Founded",
    description:
      "VIP Transport was established with a vision to redefine luxury transportation.",
    icon: Target,
  },
  {
    year: "2019",
    title: "Fleet Expansion",
    description:
      "Added premium vehicles and expanded service to major metropolitan areas.",
    icon: Car,
  },
  {
    year: "2020",
    title: "Technology Innovation",
    description:
      "Launched our mobile app and real-time tracking system for enhanced customer experience.",
    icon: TrendingUp,
  },
  {
    year: "2021",
    title: "Corporate Partnerships",
    description:
      "Established partnerships with Fortune 500 companies for corporate transportation services.",
    icon: Users,
  },
  {
    year: "2022",
    title: "Service Excellence Award",
    description:
      "Recognized as the premier luxury transportation service in the region.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Sustainable Future",
    description:
      "Committed to environmental responsibility with hybrid and electric vehicle integration.",
    icon: Globe,
  },
];

// Customer testimonials
const testimonials = [
  {
    id: 1,
    name: "Robert Sterling",
    position: "CEO, Sterling Industries",
    company: "Sterling Industries",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
    quote:
      "VIP Transport has become an integral part of our corporate operations. Their reliability and professionalism are unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Maria Garcia",
    position: "Event Coordinator",
    company: "Luxury Events Co.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    quote:
      "For high-profile events, we trust only VIP Transport. They consistently deliver exceptional service that impresses our clients.",
    rating: 5,
  },
  {
    id: 3,
    name: "Alexander Kim",
    position: "Investment Banker",
    company: "Global Finance Group",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=200&h=200&fit=crop&crop=face",
    quote:
      "The attention to detail and luxury experience provided by VIP Transport sets them apart from any other service I've used.",
    rating: 5,
  },
];

const AboutPage = () => {
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [visibleStats, setVisibleStats] = useState([]);
  const statsRef = useRef(null);
  const videoRef = useRef(null);

  // Animate stats when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate stats with staggered delay
            companyStats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats((prev) => [...prev, index]);
              }, index * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Handle video mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Handle team member modal
  const openTeamMemberModal = (member) => {
    setSelectedTeamMember(member);
  };

  const closeTeamMemberModal = () => {
    setSelectedTeamMember(null);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop"
            alt="Luxury car interior"
            className="hero-image"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className="hero-title">
                Redefining Luxury
                <span className="highlight">Transportation</span>
              </h1>
              <p className="hero-subtitle">
                Since 2018, we've been setting the standard for premium
                transportation services, combining elegance, reliability, and
                exceptional customer care.
              </p>
              <div className="hero-actions">
                <Link to="/book" className="btn btn-primary btn-lg">
                  Experience Luxury
                  <ChevronRight size={20} />
                </Link>
                <Link to="/contact" className="btn btn-outline btn-lg">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {companyStats.map((stat, index) => (
              <div
                key={index}
                className={`stat-card ${
                  visibleStats.includes(index) ? "visible" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="stat-icon">
                  <stat.icon size={32} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="container">
          <div className="content-grid">
            {/* Mission & Vision */}
            <div className="mission-vision">
              <div className="mission-card">
                <div className="card-icon">
                  <Target size={32} />
                </div>
                <h3 className="card-title">Our Mission</h3>
                <p className="card-description">
                  To provide unparalleled luxury transportation experiences that
                  exceed expectations, ensuring safety, comfort, and elegance in
                  every journey we facilitate for our valued clients.
                </p>
              </div>

              <div className="vision-card">
                <div className="card-icon">
                  <Eye size={32} />
                </div>
                <h3 className="card-title">Our Vision</h3>
                <p className="card-description">
                  To be the global leader in luxury transportation, known for
                  innovation, sustainability, and creating memorable experiences
                  that define the future of premium travel.
                </p>
              </div>
            </div>

            {/* Company Story */}
            <div className="company-story">
              <div className="story-content">
                <h2 className="story-title">Our Story</h2>
                <p className="story-text">
                  Founded in 2018 by a team of transportation industry veterans,
                  VIP Transport emerged from a simple yet powerful vision: to
                  create a luxury transportation service that truly prioritizes
                  the client experience above all else.
                </p>
                <p className="story-text">
                  What started as a boutique service with just three premium
                  vehicles has grown into a comprehensive luxury transportation
                  company, serving discerning clients across major metropolitan
                  areas. Our success is built on unwavering commitment to
                  quality, safety, and personalized service.
                </p>
                <p className="story-text">
                  Today, we're proud to be the preferred choice for executives,
                  celebrities, and anyone who values punctuality,
                  professionalism, and luxury. Every ride with VIP Transport is
                  more than just transportation—it's an experience crafted with
                  care and attention to detail.
                </p>
              </div>

              <div className="story-image">
                <img
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop"
                  alt="Luxury fleet"
                  className="rounded-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>

          <div className="values-grid">
            {companyValues.map((value, index) => (
              <div key={index} className="value-card">
                <div className={`value-icon ${value.color}`}>
                  <value.icon size={32} />
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="container">
          <div className="video-content">
            <div className="video-text">
              <h2 className="video-title">Experience the Difference</h2>
              <p className="video-subtitle">
                See what sets VIP Transport apart in this behind-the-scenes look
                at our commitment to luxury and excellence.
              </p>
              <ul className="video-highlights">
                <li>
                  <CheckCircle size={16} />
                  Professional chauffeurs with extensive training
                </li>
                <li>
                  <CheckCircle size={16} />
                  Meticulously maintained luxury fleet
                </li>
                <li>
                  <CheckCircle size={16} />
                  Personalized service tailored to your needs
                </li>
                <li>
                  <CheckCircle size={16} />
                  24/7 customer support and concierge services
                </li>
              </ul>
            </div>

            <div className="video-player">
              <div className="video-container">
                {/* Placeholder for video - in real app would be actual video */}
                <div className="video-placeholder">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop"
                    alt="VIP Transport Service"
                    className="video-thumbnail"
                  />
                  <div className="video-controls">
                    <button className="play-button" onClick={toggleVideo}>
                      {isVideoPlaying ? (
                        <Pause size={24} />
                      ) : (
                        <Play size={24} />
                      )}
                    </button>
                    <button className="mute-button" onClick={toggleMute}>
                      {isVideoMuted ? (
                        <VolumeX size={20} />
                      ) : (
                        <Volume2 size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              Key milestones in our growth and evolution
            </p>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-icon">
                    <milestone.icon size={20} />
                  </div>
                </div>

                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate professionals behind our exceptional service
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="team-card"
                onClick={() => openTeamMemberModal(member)}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="member-overlay">
                    <span>View Profile</span>
                  </div>
                </div>

                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-bio">{member.bio}</p>

                  <div className="member-social">
                    <a href={member.linkedin} className="social-link">
                      <Linkedin size={16} />
                    </a>
                    <a href={member.twitter} className="social-link">
                      <Twitter size={16} />
                    </a>
                    <a href={`mailto:${member.email}`} className="social-link">
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Trusted by business leaders and discerning travelers
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-quote-icon">
                  <Quote size={32} />
                </div>

                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>

                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>

                <div className="testimonial-author">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="author-image"
                  />
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-position">
                      {testimonial.position}
                    </div>
                    <div className="author-company">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience VIP Transport?</h2>
            <p className="cta-subtitle">
              Join hundreds of satisfied clients who trust us for their luxury
              transportation needs.
            </p>

            <div className="cta-actions">
              <Link to="/book" className="btn btn-primary btn-lg">
                Book Your Ride
              </Link>
              <Link to="/fleet" className="btn btn-outline btn-lg">
                View Our Fleet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      {selectedTeamMember && (
        <div className="modal-overlay" onClick={closeTeamMemberModal}>
          <div className="team-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeTeamMemberModal}>
              ×
            </button>

            <div className="modal-content">
              <div className="modal-image">
                <img
                  src={selectedTeamMember.image}
                  alt={selectedTeamMember.name}
                />
              </div>

              <div className="modal-info">
                <h2 className="modal-name">{selectedTeamMember.name}</h2>
                <p className="modal-position">{selectedTeamMember.position}</p>
                <p className="modal-bio">{selectedTeamMember.bio}</p>

                <div className="modal-contact">
                  <a
                    href={`mailto:${selectedTeamMember.email}`}
                    className="contact-link"
                  >
                    <Mail size={16} />
                    Send Email
                  </a>
                  <a
                    href={selectedTeamMember.linkedin}
                    className="contact-link"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
