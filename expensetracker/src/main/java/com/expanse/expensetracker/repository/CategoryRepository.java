package com.expanse.expensetracker.repository;

import com.expanse.expensetracker.models.Category;
import com.expanse.expensetracker.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUser(User user);
}
