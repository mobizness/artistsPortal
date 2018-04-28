package com.pacegallery.portal.artist.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class ValidationException extends RuntimeException {
    private Map<String, ValidationError> errors;

    public ValidationException(List<FieldError> errors) {
        this.errors = errors.stream()
            .collect(Collectors.toMap(FieldError::getField, fieldError ->
                new ValidationError(String.valueOf(fieldError.getRejectedValue()), fieldError.getDefaultMessage())));
    }

    @Data
    @AllArgsConstructor
    public static class ValidationError {
        private String value;
        private String error;
    }
}
