package com.expanse.expensetracker.service;

import com.expanse.expensetracker.dto.ExpenseRequest;
import com.expanse.expensetracker.models.*;
import com.expanse.expensetracker.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Expense> getExpensesByUser(User user) {
        return expenseRepository.findByUser(user);
    }

    public List<Expense> getExpensesByUserAndCategory(User user, Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        return expenseRepository.findByUserAndCategory(user, category);
    }

    public Expense createExpense(User user, ExpenseRequest request) {
        Expense expense = new Expense();
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount());
        expense.setDate(request.getDate());
        expense.setUser(user);
        if (request.getCategoryId() != null) {
            categoryRepository.findById(request.getCategoryId())
                .ifPresent(expense::setCategory);
        }
        return expenseRepository.save(expense);
    }

    public Optional<Expense> updateExpense(Long id, User user, ExpenseRequest request) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if (optionalExpense.isPresent()) {
            Expense expense = optionalExpense.get();
            if (!expense.getUser().getId().equals(user.getId())) {
                return Optional.empty(); // user tidak punya akses
            }
            expense.setDescription(request.getDescription());
            expense.setAmount(request.getAmount());
            expense.setDate(request.getDate());

            if (request.getCategoryId() != null) {
                categoryRepository.findById(request.getCategoryId())
                    .ifPresent(expense::setCategory);
            } else {
                expense.setCategory(null);
            }

            return Optional.of(expenseRepository.save(expense));
        }
        return Optional.empty();
    }

    public boolean deleteExpense(Long id, User user) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if (optionalExpense.isPresent() && optionalExpense.get().getUser().getId().equals(user.getId())) {
            expenseRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Double getTotalExpense(User user) {
        return expenseRepository.findByUser(user).stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    public Double getTotalExpenseByCategory(User user, Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) return 0.0;
        return expenseRepository.findByUserAndCategory(user, category).stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }
}
