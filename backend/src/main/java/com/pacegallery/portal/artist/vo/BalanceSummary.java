package com.pacegallery.portal.artist.vo;

import com.pacegallery.portal.artist.model.Payable;
import com.pacegallery.portal.artist.model.Receivable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BalanceSummary {

    private Balance<Receivable> receivablesBalance;
    private Balance<Payable> payablesBalance;

    public BalanceSummary(Balance<Receivable> receivableBalance, Balance<Payable> payableBalance) {
        this.receivablesBalance = receivableBalance;
        this.payablesBalance = payableBalance;
    }
}
