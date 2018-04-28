package com.pacegallery.portal.artist.repository;

import com.pacegallery.portal.artist.model.Payment;
import org.springframework.data.repository.CrudRepository;

public interface PaymentRepository extends CrudRepository<Payment, Long> {
}
