package com.pacegallery.portal.artist.repository;

import com.pacegallery.portal.artist.model.LastLogin;
import org.springframework.data.repository.CrudRepository;

public interface LastLoginRepository extends CrudRepository<LastLogin, Long> {
}
