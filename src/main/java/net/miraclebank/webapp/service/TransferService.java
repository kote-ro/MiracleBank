package net.miraclebank.webapp.service;

import net.miraclebank.webapp.model.Transfer;
import net.miraclebank.webapp.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TransferService {

    @Autowired
    private TransferRepository repo;

    public List<Transfer> listAll() {
        return repo.findAll();
    }

    public void save(Transfer transfer) {
        repo.save(transfer);
    }
}
