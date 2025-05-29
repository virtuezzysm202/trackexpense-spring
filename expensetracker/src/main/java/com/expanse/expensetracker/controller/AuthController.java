package com.expanse.expensetracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.expanse.expensetracker.service.AuthService;  
import com.expanse.expensetracker.dto.RegisterRequest;  
import com.expanse.expensetracker.dto.LoginRequest;     
import com.expanse.expensetracker.models.User;

@RestController  
@RequestMapping("/api")  
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("Register Success.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        User user = authService.login(request);
        return ResponseEntity.ok("Login success: " + user.getFullName());
    }
}
