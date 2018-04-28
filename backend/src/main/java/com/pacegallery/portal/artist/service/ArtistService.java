package com.pacegallery.portal.artist.service;

import com.pacegallery.portal.artist.exception.ValidationException;
import com.pacegallery.portal.artist.model.Artist;
import com.pacegallery.portal.artist.model.User;
import com.pacegallery.portal.artist.repository.ArtistRepository;
import com.pacegallery.portal.artist.repository.LastLoginRepository;
import com.pacegallery.portal.artist.validator.UserValidator;
import com.pacegallery.portal.artist.vo.ArtistWithLogin;
import lombok.RequiredArgsConstructor;
import org.passay.PasswordGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Transactional
@RequiredArgsConstructor
public class ArtistService {

    private final static Logger logger = LoggerFactory.getLogger(ArtistService.class);

    private final BCryptPasswordEncoder encoder;

    private final ArtistRepository artistRepository;
    private final LastLoginRepository lastLoginRepository;

    private final PasswordGenerator passwordGenerator = new PasswordGenerator();

    private final UserValidator userValidator;

    public Artist createArtist(String artistKey, String name, String email, boolean active) {
        Artist artist = new Artist(artistKey, name, email, encoder.encode(generatePassword()), active);
        userValidator.validate(artist);
        return artistRepository.save(artist);
    }

    public Artist editArtist(Long id, String artistKey, String name, String email, boolean active) {
        Artist artist = artistRepository.findById(id).orElseThrow(() ->
            new ValidationException(Collections.singletonMap("id",
                new ValidationException.ValidationError(id.toString(), "User id not found"))));
        User artistToCheck = new Artist();
        artistToCheck.setId(id);
        artistToCheck.setEmail(email);
        userValidator.validateEdit(artistToCheck);
        artist.setArtistKey(artistKey);
        artist.setName(name);
        artist.setEmail(email);
        artist.setActive(active);
        return artistRepository.save(artist);
    }

    public Iterable<ArtistWithLogin> listArtists() {
        return StreamSupport.stream(artistRepository.findAll().spliterator(), false)
            .map(a -> new ArtistWithLogin(a, lastLoginRepository.findById(a.getId()).orElse(null)))
            .collect(Collectors.toList());
    }

    private String generatePassword() {
//        String generatePassword = passwordGenerator.generatePassword(10,
//            // at least one upper-case character
//            new CharacterRule(EnglishCharacterData.UpperCase, 1),
//
//            // at least one lower-case character
//            new CharacterRule(EnglishCharacterData.LowerCase, 1),
//
//            // at least one digit character
//            new CharacterRule(EnglishCharacterData.Digit, 1),
//
//            // at least one symbol (special character)
//            new CharacterRule(EnglishCharacterData.Special, 1));
        String generatePassword = "password";
        // todo: development only
        logger.debug("Generated password: " + generatePassword);
        return generatePassword;
    }
}
