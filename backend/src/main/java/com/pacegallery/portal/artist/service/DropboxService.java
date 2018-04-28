package com.pacegallery.portal.artist.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.pacegallery.portal.artist.config.properties.S3Properties;
import com.pacegallery.portal.artist.model.DropboxFile;
import com.pacegallery.portal.artist.repository.DropboxFileRepository;
import com.pacegallery.portal.artist.stream.NamedInputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.InputStream;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class DropboxService {

    private final DropboxFileRepository fileRepository;
    private final AmazonS3 s3;
    private final S3Properties s3Properties;

    public Iterable<DropboxFile> listFiles(String artistKey) {
        return fileRepository.getAllByArtistKey(artistKey);
    }

    public void uploadFile(InputStream stream, String name, String artistKey) {
        final String key = String.join("/", artistKey, name);
        final PutObjectResult result = s3.putObject(s3Properties.getBucketName(), key, stream, new ObjectMetadata());

        final DropboxFile file = new DropboxFile();
        file.setKey(key);
        file.setArtistKey(artistKey);
        file.setName(name);

        fileRepository.save(file);
    }

    public NamedInputStream getFile(String key) {
        final Optional<DropboxFile> optionalFile = fileRepository.findById(key);
        if (optionalFile.isPresent()) {
            final DropboxFile file = optionalFile.get();
            file.setLastAccessed(new Date());
            fileRepository.save(file);
            // todo: check access
            final S3Object s3Object = s3.getObject(s3Properties.getBucketName(), file.getKey());
            return new NamedInputStream(file.getName(), s3Object.getObjectContent());
        }
        return null;
    }

    public void deleteFile(String key) {
        s3.deleteObject(s3Properties.getBucketName(), key);
        fileRepository.deleteById(key);
    }
}
