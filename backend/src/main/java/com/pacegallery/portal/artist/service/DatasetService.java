package com.pacegallery.portal.artist.service;

import com.pacegallery.portal.artist.exception.ValidationException;
import com.pacegallery.portal.artist.model.Payable;
import com.pacegallery.portal.artist.model.Payment;
import com.pacegallery.portal.artist.model.Receivable;
import lombok.RequiredArgsConstructor;
import org.apache.poi.openxml4j.exceptions.NotOfficeXmlFileException;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DatasetService {

    private static final Logger logger = LoggerFactory.getLogger(DatasetService.class);

    private final ReceivablesService receivablesService;
    private final PayablesService payablesService;

    public void saveDataset(InputStream file) {
        try {
            Workbook workbook = new XSSFWorkbook(file);
            processReceivableSheet(workbook.getSheetAt(0));
            processPayableSheet(workbook.getSheetAt(1));
        } catch (IOException | NotOfficeXmlFileException e) {
            throw createValidationException();
        }
    }

    private void processReceivableSheet(Sheet invoices) {
        List<Receivable> receivables = new ArrayList<>();
        for (int i = 3; i <= invoices.getLastRowNum(); ++i) {
            final Row row = invoices.getRow(i);
            Receivable receivable = new Receivable();
            receivable.setPgNumber(checkUnassignedPgNumber(row, 1));
            receivable.setAmount(row.getCell(8).getNumericCellValue());
            receivable.setBalance(row.getCell(9).getNumericCellValue());
            receivable.setDate(extractDate(row, 7));
            receivable.setArtistKey(trimmedString(row, 2));
            receivable.setCurrency(trimmedString(row, 24));
            receivable.setClientName(trimmedString(row, 22));
            receivable.setInvoiceId(trimmedString(row, 6));

            receivables.add(receivable);
        }
        receivablesService.saveReceivables(receivables);
    }

    private void processPayableSheet(Sheet invoices) {
        int i = 3;
        List<Payable> payables = new ArrayList<>();
        while (i <= invoices.getLastRowNum()) {
            Payable payable = processPayableRow(invoices, i);

            ++i;
            while (i <= invoices.getLastRowNum()) {
                if (checkNotPayable(invoices, i)) {
                    Payment payment = processPayment(invoices, i);
                    if (payment != null) {
                        payable.getPayments().add(payment);
                    }
                    ++i;
                } else {
                    break;
                }
            }
            payables.add(payable);
        }
        payablesService.savePayables(payables);
    }

    private Payable processPayableRow(Sheet sheet, int i) {
        final Row row = sheet.getRow(i);
        Payable payable = new Payable();
        payable.setApDocument(trimmedString(row, 1));
        payable.setPgNumber(checkUnassignedPgNumber(row, 4));
        payable.setRct(trimmedString(row, 7));
        payable.setAmount(Math.abs(row.getCell(10).getNumericCellValue()));
        payable.setDate(extractDate(row, 9));
        payable.setArtistKey(trimmedString(row, 2));
        payable.setCurrency(extractPayableCurrency(trimmedString(row, 17)));

        return payable;
    }

    private Payment processPayment(Sheet invoices, int i) {
        Row row = invoices.getRow(i);

        boolean empty = true;
        for (int j = 0; j <= row.getLastCellNum(); ++j) {
            if (row.getCell(j) != null && notEmptyString(row, j)) {
                empty = false;
            }
        }
        if (empty)
            return null;
        Payment payment = new Payment();
        payment.setPmt(trimmedString(row, 11));
        payment.setDate(extractDate(row, 14));
        payment.setAmount(Math.abs(row.getCell(15).getNumericCellValue()));
        return payment;
    }

    private boolean notEmptyString(Row row, int j) {
        return row.getCell(j).getCellTypeEnum() == CellType.STRING && !trimmedString(row, j).isEmpty();
    }

    private String trimmedString(Row row, int cell) {
        return row.getCell(cell).getStringCellValue().trim();
    }

    private boolean checkNotPayable(Sheet invoices, int i) {
        Row row = invoices.getRow(i);
        return trimmedString(row, 1).isEmpty();
    }

    private String extractPayableCurrency(String s) {
        switch (s) {
            case "Z-US$":
                return "USD";
            default: {
                logger.error("Unknown currency: " + s);
                return "UNKNOWN";
            }
        }
    }

    private Instant extractDate(Row row, int i) {
        return Instant.EPOCH.plusMillis(row.getCell(i).getDateCellValue().getTime());
    }

    private String checkUnassignedPgNumber(Row row, int i) {
        final String value = trimmedString(row, i);
        if (value.equals("") || value.equals("99999"))
            return "UNASSIGNED";
        return value;
    }

    private ValidationException createValidationException() {
        return new ValidationException(Collections.singletonMap(
            "file", new ValidationException.ValidationError(null, "Failed to parse Excel file")
        ));
    }
}
