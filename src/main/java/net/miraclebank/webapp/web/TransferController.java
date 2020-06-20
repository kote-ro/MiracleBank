package net.miraclebank.webapp.web;

import net.miraclebank.webapp.model.Transfer;
import net.miraclebank.webapp.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
public class TransferController {

    @Autowired
    private TransferService service;

    @RequestMapping("/send-money-form")
    public String viewHomePage(Model model) {
        List<Transfer> listOfTransfers = service.listAll();
        model.addAttribute("listOfTransfers", listOfTransfers);

        return "send-money-form";
    }

    @RequestMapping("send-money-form/new")
    public String showNewTransferPage(Model model) {
        Transfer transfer = new Transfer();
        model.addAttribute("transfer", transfer);
        return "new";
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String saveTransfer(@ModelAttribute("transfer") Transfer transfer) {
        service.save(transfer);

        return "redirect:/send-money-form";
    }
}
