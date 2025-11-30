package com.e_commerce.repository.otp;

import com.e_commerce.model.otp.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {

    // Find latest unused OTP for given email and purpose
    Optional<Otp> findTopByEmailAndUsedFalseAndPurposeOrderByExpiresAtDesc(String email, String purpose);
}
