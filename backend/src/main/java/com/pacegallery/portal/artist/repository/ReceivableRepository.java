package com.pacegallery.portal.artist.repository;

import com.pacegallery.portal.artist.model.Receivable;
import org.springframework.data.repository.CrudRepository;

import java.time.Instant;
import java.util.stream.Stream;

public interface ReceivableRepository extends CrudRepository<Receivable, String> {
    Stream<Receivable> getAllByDateBetweenAndArtistKey(Instant before, Instant after, String artistKey);
}
