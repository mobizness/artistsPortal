package com.pacegallery.portal.artist.controller;

import com.pacegallery.portal.artist.service.BalancesService;
import com.pacegallery.portal.artist.vo.BalanceSummary;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/artist/balance")
public class BalanceController {

    private final BalancesService balancesService;

    @GetMapping
    public Map<String, BalanceSummary> getBalances(String artistKey, int month, int year) {
        return balancesService.getBalances(artistKey, month, year);
    }
}
