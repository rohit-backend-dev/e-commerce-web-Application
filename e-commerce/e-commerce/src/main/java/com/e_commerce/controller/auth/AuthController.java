package com.e_commerce.controller.auth;

import com.e_commerce.dtos.auth.AuthResponse;
import com.e_commerce.model.auth.User;
import com.e_commerce.service.auth.UserService;
import com.e_commerce.security.auth.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    // ---------------- Signup ----------------
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        userService.signup(user); // OTP sent internally, not returned
        return ResponseEntity.ok("Signup successful! OTP sent to email.");
    }

    @PostMapping("/signup/verify")
    public ResponseEntity<AuthResponse> verifySignupOtp(@RequestParam String email, @RequestParam String otp) {
        User user = userService.verifySignupOtp(email, otp);
        String token = jwtUtil.generateToken(user.getEmail());

        AuthResponse response = AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getFirstName() + " " + user.getLastName())
                .build();

        return ResponseEntity.ok(response);
    }

    // ---------------- Login ----------------
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestParam String email, @RequestParam String password) {
        User user = userService.loginWithPassword(email, password);
        String token = jwtUtil.generateToken(user.getEmail());

        AuthResponse response = AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getFirstName() + " " + user.getLastName())
                .build();

        return ResponseEntity.ok(response);
    }

    // ---------------- OTP Login ----------------
    @PostMapping("/login/send-otp")
    public ResponseEntity<String> sendLoginOtp(@RequestParam String email) {
        userService.sendLoginOtp(email); // OTP sent internally
        return ResponseEntity.ok("OTP sent to email.");
    }

    @PostMapping("/login/verify-otp")
    public ResponseEntity<AuthResponse> verifyLoginOtp(@RequestParam String email, @RequestParam String otp) {
        User user = userService.loginWithOtp(email, otp);
        String token = jwtUtil.generateToken(user.getEmail());

        AuthResponse response = AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getFirstName() + " " + user.getLastName())
                .build();

        return ResponseEntity.ok(response);
    }

    // ---------------- Forgot Password ----------------
    @PostMapping("/forgot-password/send-otp")
    public ResponseEntity<String> sendResetPasswordOtp(@RequestParam String email) {
        userService.sendResetPasswordOtp(email); // OTP sent internally
        return ResponseEntity.ok("OTP sent to email.");
    }

    @PostMapping("/forgot-password/reset")
    public ResponseEntity<String> resetPassword(@RequestParam String email,
                                                @RequestParam String otp,
                                                @RequestParam String newPassword) {
        userService.resetPassword(email, otp, newPassword);
        return ResponseEntity.ok("Password reset successful.");
    }
}
