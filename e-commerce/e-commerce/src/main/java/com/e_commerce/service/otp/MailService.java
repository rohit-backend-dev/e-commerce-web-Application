package com.e_commerce.service.otp;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;
    private final String fromEmail = "rohitmishra729595@gmail.com";
    private final String fromName = "Forever";

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otp, String purpose) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            helper.setFrom(new InternetAddress(fromEmail, fromName));
            helper.setTo(toEmail);
            helper.setSubject(purpose + " - Your OTP");
            helper.setText("Your OTP is: " + otp + "\nIt will expire in 5 minutes.", false);
            mailSender.send(message);
        } catch (MessagingException | java.io.UnsupportedEncodingException ex) {
            throw new IllegalStateException("Failed to send OTP email", ex);
        }
    }
}
