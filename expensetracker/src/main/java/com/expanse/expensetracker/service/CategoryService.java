package com.expanse.expensetracker.service;

import com.expanse.expensetracker.models.Category;
import com.expanse.expensetracker.models.User;
import com.expanse.expensetracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getCategoriesByUser(User user) {
        return categoryRepository.findByUser(user);
    }

    // ✅ Digunakan oleh controller yang kirim @RequestBody Category
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // (optional: masih bisa dipakai kalau kamu ingin support cara lama)
    public Category createCategory(User user, String name) {
        Category category = new Category(name, user);
        return categoryRepository.save(category);
    }
}



