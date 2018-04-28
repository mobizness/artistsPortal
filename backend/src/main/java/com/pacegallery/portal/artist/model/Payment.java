package com.pacegallery.portal.artist.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.Instant;

@Data
@Entity
public class Payment {

    @Id
    @GeneratedValue
    private Long id;
    private String pmt;
    private Double amount;
    private Instant date;
}
