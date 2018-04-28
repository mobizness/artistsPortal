package com.pacegallery.portal.artist.vo;

import com.pacegallery.portal.artist.model.Receivable;

import java.util.Collections;

public class ReceivableBalance extends Balance<Receivable> {
    public static ReceivableBalance empty() {
        final ReceivableBalance receivableBalance = new ReceivableBalance();
        receivableBalance.setInvoices(Collections.emptyList());
        receivableBalance.setOpen(0.);
        receivableBalance.setTotal(0.);
        return receivableBalance;
    }
}
