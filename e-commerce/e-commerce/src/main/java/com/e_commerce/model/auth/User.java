
package com.e_commerce.model.auth;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
@NoArgsConstructor  // <-- add this
@AllArgsConstructor // optional, if you want full constructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String mobileNumber;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;
    private String role = "ROLE_USER";

    @Builder.Default
    private boolean emailVerified = false;
}
