package com.e_commerce.service.otp;

import com.e_commerce.model.otp.Otp;
import com.e_commerce.repository.otp.OtpRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    private final OtpRepository otpRepository;
    private final JavaMailSender mailSender;

    public OtpService(OtpRepository otpRepository, JavaMailSender mailSender) {
        this.otpRepository = otpRepository;
        this.mailSender = mailSender;
    }

    // Generate OTP
    public void generateOtp(String email, String purpose) {
        // Invalidate previous unused OTPs
        otpRepository.findTopByEmailAndUsedFalseAndPurposeOrderByExpiresAtDesc(email, purpose)
                .ifPresent(prevOtp -> {
                    prevOtp.setUsed(true);
                    otpRepository.save(prevOtp);
                });

        String code = String.format("%06d", new Random().nextInt(999999));

        Otp otp = Otp.builder()
                .email(email)
                .code(code)
                .purpose(purpose)
                .expiresAt(LocalDateTime.now().plusMinutes(5))
                .used(false)
                .build();

        otpRepository.save(otp);
        sendEmail(email, code, purpose);
    }

    private void sendEmail(String email, String code, String purpose) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(purpose + " OTP Verification");
        message.setText("Your OTP is: " + code + "\nIt expires in 5 minutes.");
        mailSender.send(message);
    }

    // Verify OTP
    public void verifyOtp(String email, String code, String purpose) {
        Otp otp = otpRepository.findTopByEmailAndUsedFalseAndPurposeOrderByExpiresAtDesc(email, purpose)
                .orElseThrow(() -> new IllegalArgumentException("OTP not found"));

        if (otp.getExpiresAt().isBefore(LocalDateTime.now()))
            throw new IllegalArgumentException("OTP expired");

        if (!otp.getCode().equals(code))
            throw new IllegalArgumentException("Invalid OTP");

        otp.setUsed(true);
        otpRepository.save(otp);
    }
}
