package com.pacegallery.portal.artist.controller;

import com.pacegallery.portal.artist.exception.ValidationException;
import com.pacegallery.portal.artist.service.DatasetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;

@RestController
@RequiredArgsConstructor
public class UploadController {

    private final DatasetService datasetService;

    @RequestMapping(value = "/api/admin/upload", method = RequestMethod.POST)
    public void uploadDataset(@RequestParam("file") MultipartFile file) {
        try {
            datasetService.saveDataset(file.getInputStream());
        } catch (IOException e) {
            throw new ValidationException(Collections.singletonMap("file", new ValidationException.ValidationError(null, "File is required")));
        }
    }
}
