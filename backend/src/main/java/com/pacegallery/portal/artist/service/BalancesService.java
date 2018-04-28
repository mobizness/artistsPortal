package com.pacegallery.portal.artist.service;

import com.pacegallery.portal.artist.vo.BalanceSummary;
import com.pacegallery.portal.artist.vo.PayableBalance;
import com.pacegallery.portal.artist.vo.ReceivableBalance;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.ZoneOffset;
import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class BalancesService {

    private final ReceivablesService receivablesService;
    private final PayablesService payablesService;

    public Map<String, BalanceSummary> getBalances(String artistKey, int month, int year) {
        final Instant begin = YearMonth.of(year, month).atDay(1).atStartOfDay().toInstant(ZoneOffset.UTC);
        final Instant end = YearMonth.of(year, month).atEndOfMonth().atTime(LocalTime.MAX).toInstant(ZoneOffset.UTC);

        final Map<String, ReceivableBalance> receivableBalances = receivablesService.getReceivableBalances(artistKey, begin, end);
        final Map<String, PayableBalance> payableBalances = payablesService.getPayableBalances(artistKey, begin, end);

        return Stream.of(receivableBalances, payableBalances).map(Map::keySet).flatMap(Collection::stream).distinct()
            .collect(Collectors.toMap(key -> key, key ->
                new BalanceSummary(receivableBalances.getOrDefault(key, ReceivableBalance.empty()),
                    payableBalances.getOrDefault(key, PayableBalance.empty()))));
    }

}
