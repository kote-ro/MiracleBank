package net.miraclebank.webapp.model;

import javax.persistence.*;
// entity "money transfer"
@Entity
public class Transfer {
    private Long transfer_id;
    private Long cardSender;
    private Long cardReceiver;
    private String description;
    // constructor without parameters is required
    public Transfer() {}

    public Transfer(Long transfer_id, Long cardSender, Long cardReceiver, String description) {
        this.transfer_id = transfer_id;
        this.cardSender = cardSender;
        this.cardReceiver = cardReceiver;
        this.description = description;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id", updatable = false, nullable = false, unique=true)
    public Long getTransfer_id() {
        return transfer_id;
    }

    public void setTransfer_id(Long id) {
        this.transfer_id = id;
    }

    public Long getCardSender() {
        return cardSender;
    }

    public void setCardSender(Long cardSender) {
        this.cardSender = cardSender;
    }

    public Long getCardReceiver() {
        return cardReceiver;
    }

    public void setCardReceiver(Long cardReceiver) {
        this.cardReceiver = cardReceiver;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
