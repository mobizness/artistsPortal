package com.pacegallery.portal.artist.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Receivable extends Invoice {

    @Id
    private String pgNumber;
    private String invoiceId;
    private String clientName;
    private Double amount;
    private Double balance;
}
