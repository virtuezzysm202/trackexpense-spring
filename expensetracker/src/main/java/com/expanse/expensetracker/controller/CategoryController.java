package com.expanse.expensetracker.controller;

import com.expanse.expensetracker.models.Category;
import com.expanse.expensetracker.models.User;
import com.expanse.expensetracker.repository.CategoryRepository;
import com.expanse.expensetracker.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;


    @GetMapping
    public ResponseEntity<List<Category>> getUserCategories(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(categoryRepository.findByUser(user));
    }


    @PostMapping
    public ResponseEntity<Category> createCategory(@AuthenticationPrincipal User user,
                                                   @RequestBody Category category) {
        category.setName(category.getName().trim());
        category.setUser(user);
        return ResponseEntity.ok(categoryService.createCategory(category));
    }
}
