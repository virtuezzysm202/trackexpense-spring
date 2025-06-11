package com.expanse.expensetracker.repository;

import com.expanse.expensetracker.models.Expense;
import com.expanse.expensetracker.models.User;
import com.expanse.expensetracker.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
    List<Expense> findByUserAndCategory(User user, Category category);
}
