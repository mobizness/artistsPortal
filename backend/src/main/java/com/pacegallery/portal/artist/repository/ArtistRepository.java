package com.pacegallery.portal.artist.repository;

import com.pacegallery.portal.artist.model.Artist;
import com.pacegallery.portal.artist.model.Role;
import com.pacegallery.portal.artist.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ArtistRepository extends CrudRepository<Artist, Long> {
    Artist findByEmail(String email);
}
