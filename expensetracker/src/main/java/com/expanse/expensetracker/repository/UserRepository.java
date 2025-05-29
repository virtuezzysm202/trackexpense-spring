package com.expanse.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.expanse.expensetracker.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}