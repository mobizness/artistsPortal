package com.pacegallery.portal.artist.repository;

import com.pacegallery.portal.artist.model.DropboxFile;
import org.springframework.data.repository.CrudRepository;

public interface DropboxFileRepository extends CrudRepository<DropboxFile, String> {
    Iterable<DropboxFile> getAllByArtistKey(String artistKey);
}
