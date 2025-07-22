package com.expanse.expensetracker.controller;

import com.expanse.expensetracker.dto.ExpenseRequest;
import com.expanse.expensetracker.models.Expense;
import com.expanse.expensetracker.models.User;
import com.expanse.expensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<List<Expense>> getAll(@AuthenticationPrincipal User user,
                                                @RequestParam(required = false) Long categoryId) {
        if (user == null) {
            return ResponseEntity.status(403).build();
        }

        if (categoryId != null) {
            return ResponseEntity.ok(expenseService.getExpensesByUserAndCategory(user, categoryId));
        }
        return ResponseEntity.ok(expenseService.getExpensesByUser(user));
    }

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal User user,
                                    @RequestBody ExpenseRequest request) {
        if (user == null) {
            return ResponseEntity.status(403).body("User not authenticated");
        }

        try {
            Expense expense = expenseService.createExpense(user, request);
            return ResponseEntity.ok(expense);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Long id,
                                           @AuthenticationPrincipal User user,
                                           @RequestBody ExpenseRequest request) {
        if (user == null) {
            return ResponseEntity.status(403).body("User not authenticated");
        }

        return expenseService.updateExpense(id, user, request)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(403).body("Unauthorized to update this expense"));
    }

    @DeleteMapping("/{id}")
public ResponseEntity<?> deleteExpense(@PathVariable Long id,
                                       @AuthenticationPrincipal User user) {
    if (user == null) {
        return ResponseEntity.status(403).body("User not authenticated");
    }

    boolean deleted = expenseService.deleteExpense(id, user);
    if (deleted) {
        return ResponseEntity.ok().build();
    } else {
        return ResponseEntity.status(403).body("Unauthorized to delete this expense");
    }
}

}


