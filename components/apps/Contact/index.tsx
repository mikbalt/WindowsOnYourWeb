import { useState, type FC } from "react";
import emailjs from "@emailjs/browser";
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

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      // eslint-disable-next-line no-alert
      alert("Email service not configured. Please contact administrator.");
      return;
    }

    try {
      const templateParams = {
        from_email: formData.email,
        from_name: formData.name,
        message: formData.message,
        project_type: formData.project,
        to_email: "ikbal@taqyudin.com",
        to_name: "Ikbal Taqyudin",
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);

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
    } catch (error) {
      console.error("Error sending email:", error);
      // eslint-disable-next-line no-alert
      alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
    }
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
                placeholder="Cooking up something cool?\n
Let me know what you're building, your deadline, and the must-haves — I’m all ears (and keyboards)!"
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
