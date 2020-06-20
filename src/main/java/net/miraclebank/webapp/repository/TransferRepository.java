package net.miraclebank.webapp.repository;

import net.miraclebank.webapp.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
}
