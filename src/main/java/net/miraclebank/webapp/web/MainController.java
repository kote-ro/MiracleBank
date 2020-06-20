package net.miraclebank.webapp.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String root() {
        return "index";
    }

    @GetMapping("/login")
    public String login(Model model) {
        return "login";
    }

    @GetMapping("/user")
    public String userIndex() {
        return "user/index";
    }

    @GetMapping("/about-us")
    public String userAboutUs() {
        return "about-us";
    }

    @GetMapping("/converter")
    public String userConverter() {
        return "converter";
    }

    @GetMapping("/send-money-form")
    public String userSendMoneyForm() {
        return "send-money-form";
    }
}