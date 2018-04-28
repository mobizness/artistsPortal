package com.pacegallery.portal.artist.validator;

import com.pacegallery.portal.artist.exception.ValidationException;
import com.pacegallery.portal.artist.model.User;
import com.pacegallery.portal.artist.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class UserValidator {

    private final UserRepository userRepository;

    public void validate(User user) {
        User byEmail = userRepository.findByEmail(user.getEmail());
        if (byEmail != null) {
            throw new ValidationException(
                Collections.singletonMap("email",
                    new ValidationException.ValidationError(user.getEmail(), "Email is already registered")));
        }
    }

    public void validateEdit(User user) {
        User byEmail = userRepository.findByEmail(user.getEmail());
        if (byEmail != null && !byEmail.getId().equals(user.getId())) {
            throw new ValidationException(
                Collections.singletonMap("email",
                    new ValidationException.ValidationError(user.getEmail(), "Email is already registered")));
        }
    }
}
