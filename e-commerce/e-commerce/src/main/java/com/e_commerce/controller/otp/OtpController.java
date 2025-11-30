package com.e_commerce.controller.otp;

import com.e_commerce.service.otp.OtpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    // Send OTP (Signup/Login)
    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestParam String email,
                                          @RequestParam(required = false, defaultValue = "false") boolean forLogin) {
        String purpose = forLogin ? "Login" : "Signup";
        otpService.generateOtp(email, purpose); // no OTP returned
        return ResponseEntity.ok("OTP sent successfully to " + email);
    }

    // Verify OTP
    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String email,
                                            @RequestParam String code,
                                            @RequestParam(required = false, defaultValue = "Signup") String purpose) {
        try {
            otpService.verifyOtp(email, code, purpose);
            return ResponseEntity.ok("OTP verified successfully.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(400).body(ex.getMessage());
        }
    }
}
