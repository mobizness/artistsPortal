package com.pacegallery.portal.artist.controller;

import com.pacegallery.portal.artist.model.Artist;
import com.pacegallery.portal.artist.model.DropboxFile;
import com.pacegallery.portal.artist.model.Role;
import com.pacegallery.portal.artist.model.User;
import com.pacegallery.portal.artist.service.DropboxService;
import com.pacegallery.portal.artist.stream.NamedInputStream;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class DropboxController {

    private final DropboxService dropboxService;

    @GetMapping("/api/dropbox")
    public Iterable<DropboxFile> getFiles(@RequestParam String artistKey) {
        final User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal.getRole().equals(Role.ARTIST)) {
            final Artist artist = (Artist) principal;
            if (!artist.getArtistKey().equals(artistKey)) {
                throw new AccessDeniedException("You do not have access to this dropbox");
            }
        }
        return dropboxService.listFiles(artistKey);
    }

    @PostMapping("/api/admin/dropbox/upload")
    public void uploadFile(@RequestParam String artistKey, @RequestParam MultipartFile file) throws IOException {
        dropboxService.uploadFile(file.getInputStream(), file.getOriginalFilename(), artistKey);
    }

    @GetMapping("/api/admin/dropbox/delete")
    public void deleteFile(@RequestParam String key) {
        dropboxService.deleteFile(key);
    }

    @GetMapping("/api/dropbox/download")
    public void downloadFile(@RequestParam String key, HttpServletResponse response) {
        try {
            final NamedInputStream file = dropboxService.getFile(key);
            response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
            response.setHeader(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename=\"%s\"", file.getName()));
            // copy it to response's OutputStream
            IOUtils.copy(file.getInputStream(), response.getOutputStream());
            response.flushBuffer();
        } catch (IOException ex) {
            throw new RuntimeException("IOError writing file to output stream");
        }

    }
}
