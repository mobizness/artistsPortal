package com.pacegallery.portal.artist.controller;

import com.pacegallery.portal.artist.exception.ValidationException;
import com.pacegallery.portal.artist.form.LoginForm;
import com.pacegallery.portal.artist.model.User;
import com.pacegallery.portal.artist.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void createAdmin(@RequestBody @Valid LoginForm loginForm, BindingResult errors) {
        if (errors.hasFieldErrors()) {
            throw new ValidationException(errors.getFieldErrors());
        }
        adminService.createAdmin(loginForm.getEmail(), loginForm.getPassword());
    }

    @RequestMapping("/list")
    public List<User> listAdmins() {
        return adminService.listAdmins();
    }
}
