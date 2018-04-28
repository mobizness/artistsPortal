package com.pacegallery.portal.artist.model;

import lombok.Data;

import javax.persistence.MappedSuperclass;
import java.time.Instant;

@Data
@MappedSuperclass
public class Invoice {

    private String artistKey;
    private String currency;
    private Instant date;
}
