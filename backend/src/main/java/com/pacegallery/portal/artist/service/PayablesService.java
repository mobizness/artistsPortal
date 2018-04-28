package com.pacegallery.portal.artist.service;

import com.pacegallery.portal.artist.model.Payable;
import com.pacegallery.portal.artist.model.Payment;
import com.pacegallery.portal.artist.repository.PayableRepository;
import com.pacegallery.portal.artist.repository.PaymentRepository;
import com.pacegallery.portal.artist.vo.PayableBalance;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class PayablesService {

    private final PayableRepository payableRepository;
    private final PaymentRepository paymentRepository;

    public void savePayables(List<Payable> payables) {
        payables.forEach(payable -> {
            paymentRepository.saveAll(payable.getPayments());
            payableRepository.save(payable);
        });
    }

    public Map<String, PayableBalance> getPayableBalances(String artistKey, Instant from, Instant to) {
        final Stream<Payable> payableStream = payableRepository.getAllByDateBetweenAndArtistKey(from, to, artistKey);
        return payableStream
            .collect(Collectors.groupingBy(Payable::getCurrency))
            .entrySet()
            .stream()
            .collect(Collectors.toMap(Map.Entry::getKey, e -> getPayableBalance(e.getValue())));
    }

    private PayableBalance getPayableBalance(List<Payable> payables) {
        PayableBalance balance = new PayableBalance();
        balance.setInvoices(payables);
        final double totalPayable = payables.stream()
            .mapToDouble(Payable::getAmount).sum();
        balance.setOpen(totalPayable -
            payables.stream()
                .mapToDouble(p -> p.getPayments().stream()
                    .mapToDouble(Payment::getAmount).sum())
                .sum());
        balance.setTotal(totalPayable);
        return balance;
    }
}
