package com.pacegallery.portal.artist.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class ArtistLogin {

    @Id
    @GeneratedValue
    private Long id;
    @OneToOne
    private Artist artist;
    private Long timestamp;
}
