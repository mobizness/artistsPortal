package com.pacegallery.portal.artist.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
public class Artist extends User {

    private String artistKey;
    private String name;
    private boolean active = true;

    public Artist(String artistKey, String name, String email, String password, boolean active) {
        super(email, password, Role.ARTIST);
        this.artistKey = artistKey;
        this.name = name;
        this.active = active;
    }
}
