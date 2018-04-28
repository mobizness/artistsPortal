package com.pacegallery.portal.artist.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Payable extends Invoice {

    @Id
    private String apDocument;
    @Column(columnDefinition="TEXT")
    private String pgNumber;
    private String rct;
    private Double amount;
    @OneToMany
    private List<Payment> payments = new ArrayList<>();
}
