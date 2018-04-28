package com.pacegallery.portal.artist.vo;

import com.pacegallery.portal.artist.model.Artist;
import com.pacegallery.portal.artist.model.LastLogin;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ArtistWithLogin {

    private Artist artist;
    private LastLogin lastLogin;
}
