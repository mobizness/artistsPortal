package com.pacegallery.portal.artist.vo;

import com.pacegallery.portal.artist.model.Invoice;
import lombok.Data;

import java.util.List;

@Data
public class Balance<T extends Invoice> {

    private List<T> invoices;
    private Double open;
    private Double total;
}
