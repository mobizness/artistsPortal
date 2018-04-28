package com.pacegallery.portal.artist.service;

import com.pacegallery.portal.artist.model.Role;
import com.pacegallery.portal.artist.model.User;
import com.pacegallery.portal.artist.repository.UserRepository;
import com.pacegallery.portal.artist.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {

    private final BCryptPasswordEncoder encoder;

    private final UserRepository userRepository;

    private final UserValidator userValidator;

    public void createAdmin(String email, String password) {
        User user = new User(email, encoder.encode(password), Role.ADMIN);
        userValidator.validate(user);
        userRepository.save(user);
    }

    public List<User> listAdmins() {
        return userRepository.findAllByRole(Role.ADMIN);
    }
}
