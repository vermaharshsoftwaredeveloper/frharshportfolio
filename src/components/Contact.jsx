// src/components/Contact.jsx
import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/Contact.css';

const Contact = () => {
    const form = useRef();
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);
        setStatusMessage("");
        setIsError(false);

        // --- IMPORTANT ---
        // Replace these with your actual IDs from your EmailJS account
        const serviceID = 'service_3rpbaus';
        const templateID = 'template_ec85iyf';
        const userID = 'wKdRV1FWWgpnLHPGb'; // This is also called the Public Key

        emailjs.sendForm(serviceID, templateID, form.current, userID)
            .then((result) => {
                console.log(result.text);
                setStatusMessage("Message sent successfully!");
                setIsError(false);
                e.target.reset();
            }, (error) => {
                console.log(error.text);
                setStatusMessage("Failed to send message. Please try again later.");
                setIsError(true);
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    return (
        <section id="contact" className="contact-container">
            <h3 className="section-title">Contact Me</h3>
            <form ref={form} onSubmit={sendEmail} className="contact-form">
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="user_email" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" required />
                <button type="submit" className="btn btn-primary" disabled={isSending}>
                    {isSending ? 'Sending...' : 'Send Message'}
                </button>
                {statusMessage && (
                    <p className={`status-message ${isError ? 'error' : 'success'}`}>
                        {statusMessage}
                    </p>
                )}
            </form>
        </section>
    );
};

export default Contact;