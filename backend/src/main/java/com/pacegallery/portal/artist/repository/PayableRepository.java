package com.pacegallery.portal.artist.repository;

import com.pacegallery.portal.artist.model.Payable;
import org.springframework.data.repository.CrudRepository;

import java.time.Instant;
import java.util.stream.Stream;

public interface PayableRepository extends CrudRepository<Payable, String> {
    Stream<Payable> getAllByDateBetweenAndArtistKey(Instant before, Instant after, String artistKey);
}
