package com.pacegallery.portal.artist.form;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class ArtistForm {

    private Long id;
    @Email
    @NotNull
    private String email;
    @Size(min = 3)
    @NotNull
    private String artistKey;
    @Size(min = 3)
    @NotNull
    private String name;
    private boolean active = false;
}
