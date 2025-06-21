package com.expanse.expensetracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.expanse.expensetracker.service.AuthService;
import com.expanse.expensetracker.dto.RegisterRequest;
import com.expanse.expensetracker.dto.LoginRequest;
import com.expanse.expensetracker.models.User;
import com.expanse.expensetracker.security.JwtTokenUtil; 

@RestController
@RequestMapping("/api/auth")  
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil; 

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("Register Success.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = authService.login(request);
        String token = jwtTokenUtil.generateToken(user.getEmail()); 
        return ResponseEntity.ok().body(token);
    }
}
