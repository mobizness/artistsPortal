package com.pacegallery.portal.artist.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@Entity
public class LastLogin {

    @Id
    private Long id;
    private Long timestamp;
    private String userAgent;
    private String ipAddress;
}
