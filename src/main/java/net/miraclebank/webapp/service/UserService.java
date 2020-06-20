package net.miraclebank.webapp.service;

import net.miraclebank.webapp.model.User;
import net.miraclebank.webapp.web.dto.UserRegistrationDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User findByEmail(String email);

    User save(UserRegistrationDto registration);
}
