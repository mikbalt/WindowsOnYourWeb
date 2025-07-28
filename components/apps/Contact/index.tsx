import { useState, type FC } from "react";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import StyledContact from "components/apps/Contact/StyledContact";

const Contact: FC<ComponentProcessProps> = ({ id }) => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    name: "",
    project: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Create email body
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Project Type: ${formData.project}

Project Details:
${formData.message}
    `.trim();

    // Create mailto link
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:ikbal@taqyudin.com?subject=${subject}&body=${body}`;

    // Open email client
    window.open(mailtoLink, "_blank");

    // Show success message
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        email: "",
        message: "",
        name: "",
        project: "",
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <StyledContact id={id}>
      <div className="contact-container">
        <div className="contact-info">
          <h1>Let&apos;s Connect!</h1>
          <p>
            Ready to bring your ideas to life? I&apos;d love to hear from you
            and discuss how we can work together.
          </p>

          <div className="contact-items">
            <div className="contact-item">
              <div className="icon">📧</div>
              <div>
                <strong>Email</strong>
                <br />
                ikbal@taqyudin.com
              </div>
            </div>

            <div className="contact-item">
              <div className="icon">📍</div>
              <div>
                <strong>Location</strong>
                <br />
                Jakarta, Indonesia
              </div>
            </div>

            <div className="contact-item">
              <div className="icon">⏰</div>
              <div>
                <strong>Response Time</strong>
                <br />
                Within 24 hours
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          {isSubmitted && (
            <div className="success-message">
              Thank you! Your message has been sent successfully. I&apos;ll get
              back to you within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                onChange={handleInputChange}
                type="text"
                value={formData.name}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                onChange={handleInputChange}
                type="email"
                value={formData.email}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="project">Project Type *</label>
              <select
                id="project"
                name="project"
                onChange={handleInputChange}
                value={formData.project}
                required
              >
                <option value="">Select project type</option>
                <option value="mobile-application">
                  Mobile App Development
                </option>
                <option value="web-application">Web Development</option>
                <option value="ai-ml">AI/ML Project</option>
                <option value="automation-testing">Automation Testing</option>
                <option value="automation-consulting">
                  Software Project Consulting
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Project Details *</label>
              <textarea
                id="message"
                name="message"
                onChange={handleInputChange}
                placeholder="Tell me about your project, timeline, and any specific requirements..."
                value={formData.message}
                required
              />
            </div>

            <button className="submit-btn" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </StyledContact>
  );
};

export default Contact;
