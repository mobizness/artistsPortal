package com.pacegallery.portal.artist.service;

import com.pacegallery.portal.artist.model.Receivable;
import com.pacegallery.portal.artist.repository.ReceivableRepository;
import com.pacegallery.portal.artist.vo.ReceivableBalance;
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
public class ReceivablesService {

    private final ReceivableRepository receivableRepository;

    public void saveReceivables(List<Receivable> receivables) {
        receivableRepository.saveAll(receivables);
    }

    public Map<String, ReceivableBalance> getReceivableBalances(String artistKey, Instant from, Instant to) {
        final Stream<Receivable> receivableStream = receivableRepository.getAllByDateBetweenAndArtistKey(from, to, artistKey);
        return receivableStream
            .collect(Collectors.groupingBy(Receivable::getCurrency))
            .entrySet()
            .stream()
            .collect(Collectors.toMap(Map.Entry::getKey, e -> getReceivableBalance(e.getValue())));
    }

    private ReceivableBalance getReceivableBalance(List<Receivable> receivables) {
        ReceivableBalance balance = new ReceivableBalance();
        balance.setInvoices(receivables);
        balance.setOpen(receivables.stream().mapToDouble(Receivable::getBalance).sum());
        balance.setTotal(receivables.stream().mapToDouble(Receivable::getAmount).sum());
        return balance;
    }
}
