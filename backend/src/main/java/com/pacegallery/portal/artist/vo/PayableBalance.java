package com.pacegallery.portal.artist.vo;

import com.pacegallery.portal.artist.model.Payable;

import java.util.Collections;

public class PayableBalance extends Balance<Payable> {
    public static PayableBalance empty() {
        final PayableBalance payableBalance = new PayableBalance();
        payableBalance.setInvoices(Collections.emptyList());
        payableBalance.setOpen(0.);
        payableBalance.setTotal(0.);
        return payableBalance;
    }
}
