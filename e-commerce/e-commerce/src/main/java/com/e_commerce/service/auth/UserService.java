package com.e_commerce.service.auth;

import com.e_commerce.model.auth.User;
import com.e_commerce.repository.auth.UserRepository;
import com.e_commerce.service.otp.OtpService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final OtpService otpService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepo, OtpService otpService) {
        this.userRepo = userRepo;
        this.otpService = otpService;
    }

    // Signup
    public void signup(User user) {
        if (userRepo.existsByEmail(user.getEmail()))
            throw new IllegalArgumentException("Email already exists");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        otpService.generateOtp(user.getEmail(), "Signup"); // send OTP internally
    }

    // Verify Signup OTP
    public User verifySignupOtp(String email, String code) {
        otpService.verifyOtp(email, code, "Signup");
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setEmailVerified(true);
        return userRepo.save(user);
    }

    // Login with password
    public User loginWithPassword(String email, String password) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!user.isEmailVerified())
            throw new IllegalArgumentException("Please verify your email first");

        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new IllegalArgumentException("Invalid password");

        return user;
    }

    // Send OTP for login
    public void sendLoginOtp(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!user.isEmailVerified())
            throw new IllegalArgumentException("Please verify your email first");

        otpService.generateOtp(email, "Login"); // OTP sent internally
    }

    // Login with OTP
    public User loginWithOtp(String email, String code) {
        otpService.verifyOtp(email, code, "Login");
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    // Forgot Password
    public void sendResetPasswordOtp(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        otpService.generateOtp(email, "ResetPassword"); // OTP sent internally
    }

    public void resetPassword(String email, String otp, String newPassword) {
        otpService.verifyOtp(email, otp, "ResetPassword");
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
    }
}
