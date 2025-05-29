package com.expanse.expensetracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.expanse.expensetracker.dto.LoginRequest;
import com.expanse.expensetracker.dto.RegisterRequest;
import com.expanse.expensetracker.models.User;
import com.expanse.expensetracker.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Registrasi user baru
    public void register(RegisterRequest request) {
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already used.");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        userRepo.save(user);
    }

    // Login user berdasarkan email dan password
    public User login(LoginRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Email not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Wrong Password!");
        }

        return user;
    }
}
