package com.pacegallery.portal.artist.repository;

import com.pacegallery.portal.artist.model.Role;
import com.pacegallery.portal.artist.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByEmail(String email);
    List<User> findAllByRole(Role role);
}
