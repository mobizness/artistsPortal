package com.pacegallery.portal.artist.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pacegallery.portal.artist.model.LastLogin;
import com.pacegallery.portal.artist.model.User;
import com.pacegallery.portal.artist.repository.LastLoginRepository;
import com.pacegallery.portal.artist.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;

import static com.pacegallery.portal.artist.constants.SecurityConstants.*;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final LastLoginRepository lastLoginRepository;

    public JWTAuthorizationFilter(AuthenticationManager authManager, ObjectMapper objectMapper, UserRepository userRepository, LastLoginRepository lastLoginRepository) {
        super(authManager);
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
        this.lastLoginRepository = lastLoginRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(null);
        String header = req.getHeader(HEADER_STRING);
        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }
        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            try {
                User user = objectMapper.readValue(Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject(), User.class);

                if (user != null) {
                    user = userRepository.findByEmail(user.getEmail());
                    if (user != null) {
                        LastLogin login = new LastLogin();
                        login.setId(user.getId());
                        login.setTimestamp(new Date().getTime());
                        login.setIpAddress(request.getRemoteAddr());
                        login.setUserAgent(request.getHeader("User-Agent"));
                        lastLoginRepository.save(login);
                        return new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name())));
                    }
                }
            }
            catch (IOException ex) {
                return null;
            }
            return null;
        }
        return null;
    }
}