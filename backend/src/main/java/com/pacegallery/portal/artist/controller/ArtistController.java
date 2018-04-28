package com.pacegallery.portal.artist.controller;

import com.pacegallery.portal.artist.exception.ValidationException;
import com.pacegallery.portal.artist.form.ArtistForm;
import com.pacegallery.portal.artist.model.Artist;
import com.pacegallery.portal.artist.service.ArtistService;
import com.pacegallery.portal.artist.vo.ArtistWithLogin;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin/artist")
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    // todo: temporary method
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public Artist createArtist(@RequestBody @Valid ArtistForm form, BindingResult errors) {
        if (errors.hasFieldErrors()) {
            throw new ValidationException(errors.getFieldErrors());
        }
        if (form.getId() != null) {
            return artistService.editArtist(form.getId(), form.getArtistKey(), form.getName(), form.getEmail(), form.isActive());
        }
        return artistService.createArtist(form.getArtistKey(), form.getName(), form.getEmail(), form.isActive());
    }

    @RequestMapping("/list")
    public Iterable<ArtistWithLogin> listArtists() {
        return artistService.listArtists();
    }
}
